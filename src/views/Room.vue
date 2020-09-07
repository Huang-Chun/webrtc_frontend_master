<template>
  <div :class="$style.room">
    <Menu v-if="toggleMenu === true" />
    <video :class="$style.video" id="remoteVideo" autoplay />
    <video :class="$style.video" id="mcuVideo" autoplay hidden />
    <div :class="$style.iconButtons">
      <button
        :class="[$style.isTalking, { [$style.active]: isTalking === true }]"
        @click="talk"
      >
        {{ $t("chat") }}
      </button>
      <button
        :class="[
          $style.isAnnotating,
          { [$style.active]: isAnnotating === true }
        ]"
        @click="isAnnotating = !isAnnotating"
      >
        {{ $t("annotate") }}
      </button>
      <button
        :class="[$style.toggleMenu, { [$style.active]: toggleMenu === true }]"
        @click="toggleMenu = !toggleMenu"
      >
        {{ $t("menu") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Menu from "../components/Menu";
import { MgSdk } from "../assets/js/mgsdk.js";
export default {
  name: "room",
  components: { Menu },
  data() {
    return {
      isTalking: false,
      isAnnotating: false,
      toggleMenu: false,
      API_BASE_URL: `${process.env.VUE_APP_SERVER}`,
      DISPLAY_NAME: "DemoOnline",
      conn: null,
      mcuConn: null,
      session: null,
      localStream: null,
      localTrack: null
    };
  },
  computed: {
    ...mapGetters(["joinRoomResponse"])
  },
  methods: {
    talk() {
      this.localTrack = MgSdk.getAudioTrack(this.localStream);
      this.localTrack.enabled = !this.localTrack.enabled;
      this.isTalking = !this.isTalking;
      if (this.isTalking) {
        console.log("Microphone unmuted");
      } else {
        console.log("Microphone muted");
      }
    },
    annotate() {},
    async jsonApiGet(apiUrl) {
      let result;
      await this.$http({
        method: "get",
        url: apiUrl,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          result = res;
        })
        .catch(err => {
          result = err;
        });
      return result;
    },
    connectService(service, uri, token, stream, displayName) {
      if (service == "spRx") {
        this.conn = MgSdk.connect(service, uri, token, stream, displayName);

        this.conn.onopen = async () => {
          console.log("onopen");
          console.log(this.conn.service);
        };

        this.conn.onclose = async () => {
          console.log("onclose");
          this.setRemoteVideo(null);
        };

        this.conn.onsignalingstatechange = async () => {
          console.log("onsignalingstatechange", this.conn.signalingState);
        };

        this.conn.oniceconnectionstatechange = async () => {
          console.log(
            "oniceconnectionstatechange",
            this.conn.iceConnectionState
          );
        };

        this.conn.ontrack = async evt => {
          console.log("ontrack");
          this.setRemoteVideo("#remoteVideo", evt.streams[0]);
        };
      } else if (service == "mcu") {
        this.mcuConn = MgSdk.connect(service, uri, token, stream, displayName);

        this.mcuConn.onopen = async () => {
          console.log("onopen");
          console.log(this.mcuConn.service);
        };

        this.mcuConn.onclose = async () => {
          console.log("onclose");
          this.setRemoteVideo(null);
        };

        this.mcuConn.onsignalingstatechange = async () => {
          console.log("onsignalingstatechange", this.mcuConn.signalingState);
        };

        this.mcuConn.oniceconnectionstatechange = async () => {
          console.log(
            "oniceconnectionstatechange",
            this.mcuConn.iceConnectionState
          );
        };

        this.mcuConn.ontrack = async evt => {
          console.log("ontrack");
          this.setRemoteVideo("#mcuVideo", evt.streams[0]);
        };

        // mcu layout
        this.mcuConn.onlayout = async evt => {
          console.log("onlayout", evt);
        };
      }
    },
    setRemoteVideo(elem, stream) {
      MgSdk.setVideoStream(elem, stream);
    },
    async getMic() {
      this.localStream = await MgSdk.getUserAudio();
      this.localTrack = MgSdk.getAudioTrack(this.localStream);
      console.log(`使用聲音裝置 => ${this.localTrack.label}`);
      this.localTrack.enabled = false;
    },
    async startRx() {
      // await this.getMic();
      await this.connectService(
        "spRx",
        this.joinRoomResponse.data.data.uri,
        this.joinRoomResponse.data.data.rxToken,
        null,
        this.DISPLAY_NAME
      );
    },
    async joinMcu() {
      await this.getMic();
      await this.connectService(
        "mcu",
        this.joinRoomResponse.data.data.mcuUri,
        this.joinRoomResponse.data.data.token,
        this.localStream,
        this.DISPLAY_NAME
      );
    },
    async pushTalk() {
      await this.getMic();
      await this.connectService(
        "spRx",
        this.joinRoomResponse.data.data.uri,
        this.joinRoomResponse.data.data.rxToken,
        null,
        this.DISPLAY_NAME
      );
      await this.connectService(
        "mcu",
        this.joinRoomResponse.data.data.mcuUri,
        this.joinRoomResponse.data.data.token,
        this.localStream,
        this.DISPLAY_NAME
      );
    }
  },
  mounted() {
    this.startRx();
    //this.joinMcu();
    // this.pushTalk();
  }
};
</script>
<style lang="scss" module>
@import "../assets/scss/_mixin.scss";
.room {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  .video {
    width: 100%;
    background-color: #000;
    height: calc(100% - 130px);
  }
  .iconButtons {
    height: 130px;
    width: 100%;
    background-color: $backgroundColor;
    display: flex;
    justify-content: center;
    position: relative;
    button {
      width: 207px;
      font-size: 1.25rem;
    }
    &::before {
      content: "";
      display: block;
      width: 300px;
      background-image: url("~@/assets/img/logo-s.png");
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      left: 45px;
      top: 0;
      bottom: 0;
    }
    .isAnnotating {
      @include button-icon(
        "~@/assets/img/annotate.svg",
        "~@/assets/img/annotate-hover.svg"
      );
    }
    .isTalking {
      @include button-icon(
        "~@/assets/img/chat.svg",
        "~@/assets/img/chat-hover.svg"
      );
    }
    .toggleMenu {
      @include button-icon(
        "~@/assets/img/menu.svg",
        "~@/assets/img/menu-hover.svg"
      );
    }
  }
  @media (max-width: 1024px) {
    .video {
      height: calc(100% - 93px);
    }
    .iconButtons {
      height: 93px;
      button {
        width: 147px;
      }
      &::before {
        left: 31px;
        width: 210px;
        background-size: 210px 42px;
      }
    }
  }
  @media (max-width: 360px) {
    .video {
      height: calc(100% - 70px);
    }
    .iconButtons {
      height: 70px;
      button {
        width: 120px;
        font-size: 1rem;
      }
      &::before {
        display: none;
      }
    }
  }
}
</style>
<i18n>
{
  "tw": {
    "chat" : "發言",
    "annotate" : "畫筆",
    "menu" : "選單"
  },
  "en": {
    "chat" : "Chat",
    "annotate" : "Annotate",
    "menu" : "Menu"
  }
}
</i18n>
