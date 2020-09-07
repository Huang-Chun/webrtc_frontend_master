<template>
  <div :class="$style.home">
    <div :class="$style.content">
      <img src="@/assets/img/logo-s.png" />
      <div :class="$style.greet">
        {{ $t("greet", { name: loginResponse.name }) }}
      </div>
      <div :class="$style.buttons">
        <router-link to="/setting" tag="button" :class="$style.button">
          {{ $t("joinRoom") }}
        </router-link>
        <button :class="[$style.button, $style.logoutButton]" @click="logout()">
          {{ $t("logout") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["loginResponse"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", { email: this.loginResponse.email });
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.home {
  @include page-desktop;
  .content {
    @include flex-layout(column, center, center, wrap);
    align-content: space-between;
    img {
      width: 300px;
      height: 60px;
      padding: 0 20px;
    }
    .greet {
      @include font-size-x-large;
      color: $textColor;
    }
  }
  @media (max-width: 360px) {
    .content {
      font-size: 18px;
      img {
        margin-top: 115px;
      }
      .buttons {
        flex-direction: column;
        margin-bottom: 72px;
        height: 42px * 2 + 29px;
      }
    }
  }
}
</style>

<i18n>
{
  "tw": {
    "greet" : "{name}，您好！",
    "roomId" : "會議編號",
    "joinRoom" : "加入會議",
    "logout" : "登出"
  },
  "en": {
    "greet" : "Hi! {name}",
    "roomId" : "Room number",
    "joinRoom" : "Join a room",
    "logout" : "Logout"
  }
}
</i18n>
