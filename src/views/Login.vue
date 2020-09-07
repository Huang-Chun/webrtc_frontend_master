<template>
  <div :class="$style.login">
    <div :class="$style.content">
      <img src="@/assets/img/logo-s.png" />
      <form :class="$style.form" @submit.prevent="login()">
        <div :class="$style.input">
          <label for="email">{{ $t("email") }}</label>
          <input
            id="email"
            type="email"
            v-model="email"
            :class="{ hasValue: email !== '' }"
            required
          />
        </div>
        <div :class="$style.input">
          <label for="password">{{ $t("password") }}</label>
          <input
            id="password"
            type="password"
            v-model="password"
            :class="{ hasValue: password !== '' }"
            required
          />
        </div>
        <aside :class="$style.aside">
          <span
            >{{ $t("ifHavingAccount") }}
            <router-link to="/register" tag="button" type="button">
              {{ $t("CreateAnAcount") }}
            </router-link></span
          >
        </aside>
        <input type="submit" :class="$style.button" :value="`${$t('login')}`" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["isLogin", "isLoading", "loginResponse"])
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          alert(this.loginResponse.msg);
          if (this.isLogin == true) {
            this.$router.push("/");
            this.email = "";
            this.password = "";
          }
        });
    }
  }
};
</script>
<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.login {
  @include page-desktop;
  .content {
    font-size: 18px;
    @include flex-layout(column, center, center, wrap);
    .form {
      @include form;
      height: 390px;
      margin-top: 35px;
      .aside {
        @include flex-layout(column, center, center, wrap);
        @include font-size-regular;
        width: 100%;
        padding: 20px;
        margin: 17px 0 10px 0;
        button {
          @include font-size-regular;
          @include button-secondary;
          margin-top: 1em;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .content {
      font-size: 16px;
      .form {
        height: auto;
        margin-top: 0;
        .input input {
          height: 30px;
        }
        .aside {
          padding: 0;
          margin-top: 0;
        }
        .button {
          margin-bottom: 24px;
        }
      }
    }
  }
  @media (max-width: 360px) {
    .content {
      font-size: 18px;
      img {
        margin-top: 95px;
      }
      .form {
        height: calc(100% - 155px);
        .input input {
          height: 38px;
        }
        .aside {
          padding: 0;
          margin-top: 0;
        }
        .button {
          margin-bottom: 72px;
        }
      }
    }
  }
}
</style>
<i18n>
{
  "tw": {
    "login" : "登入",
    "register" : "註冊",
    "email" : "信箱",
    "password" : "密碼",
    "ifHavingAccount" : "還沒有帳號嗎？",
    "CreateAnAcount" : "新建帳戶"
  },
  "en": {
    "login" : "Login",
    "register" : "Register",
    "email" : "Email",
    "password" : "Password",
    "ifHavingAccount" : "No account ?",
    "CreateAnAcount" : "Create an account"
  }
}
</i18n>
