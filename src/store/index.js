import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginResponse: {},
    registerResponse: {},
    joinRoomResponse: {},
    isLoading: false
  },
  mutations: {
    LOGIN(state, payload) {
      if (payload.data.success == true) {
        state.isLogin = true;
        state.loginResponse = payload.data;
      } else {
        state.isLogin = false;
        state.loginResponse = payload.data;
      }
    },
    REGISTER(state, payload) {
      state.registerResponse = payload.data;
    },
    LOGOUT(state, payload) {
      if (payload.data.success == true) {
        state.isLogin = false;
      }
    },
    JOIN_ROOM(state, payload) {
      state.joinRoomResponse = payload.data;
    },
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    login: (context, payload) => {
      context.commit("IS_LOADING", true);
      return new Promise(resolve => {
        axios({
          method: "post",
          url: `${process.env.VUE_APP_SERVER}/users/login`,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          data: payload
        }).then(res => {
          context.commit("LOGIN", res);
          context.commit("IS_LOADING", false);
          resolve();
        });
      });
    },
    register: (context, payload) => {
      context.commit("IS_LOADING", true);
      return new Promise(resolve => {
        axios({
          method: "post",
          url: `${process.env.VUE_APP_SERVER}/users/register`,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          data: payload
        }).then(res => {
          context.commit("REGISTER", res);
          context.commit("IS_LOADING", false);
          resolve();
        });
      });
    },
    logout: (context, payload) => {
      context.commit("IS_LOADING", true);
      return new Promise(resolve => {
        axios({
          method: "post",
          url: `${process.env.VUE_APP_SERVER}/users/logout`,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          data: payload
        }).then(res => {
          context.commit("LOGOUT", res);
          context.commit("IS_LOADING", false);
          resolve();
        });
      });
    },
    joinRoom: (context, payload) => {
      context.commit("IS_LOADING", true);
      return new Promise(resolve => {
        axios({
          method: "post",
          url: `${process.env.VUE_APP_SERVER}/index/join/${payload.roomid}`,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          data: payload
        }).then(res => {
          context.commit("JOIN_ROOM", res);
          context.commit("IS_LOADING", false);
          resolve();
        });
      });
    }
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    isLoading(state) {
      return state.isLoading;
    },
    loginResponse(state) {
      return state.loginResponse;
    },
    registerResponse(state) {
      return state.registerResponse;
    },
    joinRoomResponse(state) {
      return state.joinRoomResponse;
    }
  }
});
