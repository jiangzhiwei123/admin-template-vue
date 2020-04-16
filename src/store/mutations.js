export default {
  SET_NICK(state, nick) {
    state.nick = nick;
  },
  SET_LEVEL(state, level) {
    state.level = level;
  },
  getParam(state, Object) {
    console.log(Object);
    state.text = Object;
  }
};
