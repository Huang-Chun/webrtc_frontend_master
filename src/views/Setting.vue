<template>
  <div :class="$style.setting">
    <div :class="$style.content">
      <img src="@/assets/img/logo-s.png" />
      <form :class="$style.form" @submit.prevent="joinRoom()">
        <div :class="$style.input">
          <label for="roomId">{{ $t("roomId") }}</label>
          <input
            id="roomId"
            type="text"
            v-model="roomId"
            :class="{ hasValue: roomId !== '' }"
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
          />
        </div>
        <div :class="$style.buttons">
          <router-link
            tag="button"
            type="button"
            :class="$style.button"
            to="/"
            >{{ $t("back") }}</router-link
          >
          <input
            type="submit"
            :class="$style.button"
            :value="`${$t('joinRoom')}`"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "setting",
  data() {
    return {
      roomId: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["loginResponse", "joinRoomResponse"])
  },
  methods: {
    joinRoom() {
      this.$store
        .dispatch("joinRoom", {
          email: this.loginResponse.email,
          roomid: this.roomId,
          password: this.password
        })
        .then(() => {
          if (this.joinRoomResponse.success === true) {
            this.$router.push(`/room/${this.roomId}`);
          } else {
            alert(this.joinRoomResponse.msg);
          }
        });
    }
  }
};
</script>

<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.setting {
  @include page-desktop;
  .content {
    font-size: 18px;
    @include flex-layout(column, center, center, wrap);
    align-content: space-between;
    .form {
      @include form;
      height: 390px;
      margin-top: 35px;
      .buttons {
        margin-top: 115px;
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
        .buttons {
          width: 85%;
          margin-top: 40px;
        }
      }
    }
  }
  @media (max-width: 360px) {
    .content {
      font-size: 18px;
      img {
        margin-top: 115px;
      }
      .buttons {
        flex-direction: column-reverse;
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
    "roomId" : "會議編號",
    "joinRoom" : "加入會議",
    "password" : "密碼",
    "back" : "返回"
  },
  "en": {
    "roomId" : "Room number",
    "joinRoom" : "Join the room",
    "password" : "Password",
    "back" : "back"
  }
}
</i18n>
