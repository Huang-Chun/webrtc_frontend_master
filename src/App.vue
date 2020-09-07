<template>
  <div id="app" :class="$style.app">
    <div
      :class="[$style.cover, { [$style.hide]: logoShowing === false }]"
      @click="logoShowing = false"
    >
      <div :class="$style.content"><img src="@/assets/img/logo-m.svg" /></div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      logoShowing: true
    };
  },
  created() {
    setInterval(
      function() {
        this.logoShowing = false;
      }.bind(this),
      3000
    );
  }
};
</script>
<style lang="scss" module>
@import "@/assets/scss/_reset.scss";
@import "@/assets/scss/_mixin.scss";
* {
  font-family: $font-family-primary;
  font-weight: $font-weight-regular;
}
.app {
  margin: auto;
  min-width: $mobile-small;
  height: 100vh;
  overflow: hidden;
  .cover {
    @include page-desktop;
    @media (max-width: 1024px) {
      img {
        width: 90%;
      }
    }
    @media (max-width: 1024px) {
      img {
        width: 80%;
      }
    }
    position: fixed;
    width: 100%;
    transition: 0.5s all;
    z-index: 999;
    overflow: hidden;
    .content {
      @include flex-layout(row, center, center);
    }
    &.hide {
      transform: translateX(-100%);
    }
  }
}
</style>
