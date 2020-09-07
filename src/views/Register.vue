<template>
  <div :class="$style.register">
    <div :class="$style.content">
      <form :class="$style.form" @submit.prevent="register()">
        <div :class="$style.input">
          <label for="name">{{ $t("name") }}</label>
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{ hasValue: name !== '' }"
            required
          />
        </div>
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
        <div :class="[$style.input, $style.visibility]">
          <label for="confirmPassword">{{ $t("confirmPassword") }}</label>
          <input
            id="confirmPassword"
            :type="visibility ? 'text' : 'password'"
            v-model="confirmPassword"
            :class="{ hasValue: confirmPassword !== '' }"
            required
          />
          <img
            :src="visibility ? eyeOpen : eye"
            @click="visibility = !visibility"
          />
        </div>
        <aside :class="$style.aside">
          <span
            >{{ $t("ifHavingAccount") }}
            <router-link to="/login" tag="button" type="button">
              {{ $t("login") }}
            </router-link></span
          >
        </aside>
        <input
          type="submit"
          :class="$style.button"
          :value="`${$t('register')}`"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      visibility: false
    };
  },
  computed: {
    ...mapGetters(["registerResponse"]),
    eye() {
      return require("@/assets/img/eye.svg");
    },
    eyeOpen() {
      return require("@/assets/img/eye-open.svg");
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password2: this.confirmPassword
        })
        .then(() => {
          alert(this.registerResponse.msg);
          if (this.registerResponse.success === true) {
            this.$router.push("/login");
          }
        });
    }
  }
};
</script>

<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.register {
  @include page-desktop;
  .content {
    font-size: 18px;
    @include flex-layout(column, center, center, wrap);
    align-content: space-between;
    .form {
      @include form;
      height: 100%;
      .input {
        margin: 5px;
      }
      .aside {
        @include flex-layout(column, center, center, wrap);
        @include font-size-regular;
        width: 100%;
        button {
          @include font-size-regular;
          @include button-secondary;
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
        .button {
          margin-bottom: 24px;
        }
      }
    }
  }
  @media (max-width: 360px) {
    .content {
      font-size: 18px;
      .form {
        height: calc(100% - 75px);
        padding-top: 75px;
        .input input {
          height: 38px;
        }
        .aside {
          margin: 10px 0;
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
    "name" : "暱稱",
    "email" : "信箱",
    "password" : "密碼",
    "confirmPassword" : "確認密碼",
    "ifHavingAccount" : "已經有帳號了嗎？",
    "back": "返回"
  },
  "en": {
    "login" : "Login",
    "register" : "Register",
    "name" : "Name",
    "email" : "Email",
    "password" : "Password",
    "confirmPassword" : "Comfirm password",
    "ifHavingAccount" : "Already have a account ?",
    "back": "Back"
  }
}
</i18n>
