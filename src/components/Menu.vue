<template>
  <div :class="$style.menu">
    <div :class="$style.card">
      <img src="@/assets/img/logo-s.png" />
      <button :class="$style.closeButton" @click="closeMenu()" />
      <button :class="$style.button" @click="checkParticipants()">
        {{ $t("participants") }}
      </button>
      <button :class="$style.button" @click="leaveRoom()">
        {{ $t("leaveRoom") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Menu",
  computed: {
    ...mapGetters(["roomData"])
  },
  methods: {
    closeMenu() {
      this.$parent.$data.toggleMenu = false;
    },
    leaveRoom() {
      this.$router.push("/");
    },
    checkParticipants() {}
  }
};
</script>
<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.menu {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  .card {
    font-size: 18px;
    padding: 45px;
    width: 490px;
    height: 485px;
    background-color: $backgroundColor;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::after {
      content: "";
      display: block;
      height: 30px;
    }
    .closeButton {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 30px;
      height: 30px;
      background-image: url("~@/assets/img/close.svg");
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .button {
      @include button-primary;
    }
  }
  @media (max-width: 1024px) {
    .card {
      width: 320px;
      height: 320px;
      padding: 31px;
      &::after {
        display: none;
      }
    }
  }
  @media (max-width: 360px) {
    align-items: flex-start;
    .card {
      margin-top: 145px;
      width: 290px;
      height: 280px;
      padding: 0;
      justify-content: center;
      .button {
        margin: 14.5px 0;
      }
      img {
        display: none;
      }
    }
  }
}
</style>
<i18n>
{
  "tw": {
    "leaveRoom" : "離開會議",
    "participants" : "與會者列表"
  },
  "en": {
    "leaveRoom" : "Leave the room",
    "participants" : "Participants"
  }
}
</i18n>
