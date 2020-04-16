<template>
  <div>
    <div class="cardItem" @click="goFrontFn">
      <div class="back" :class="{ tofront: back }">
        <img src="../assets/images/card_back.png" alt />
      </div>
      <div class="front" :class="{ toback: back }">
        <img src="../assets/images/card.png" alt />
      </div>
    </div>
    <div @click="resetFn">重置</div>
    <br />
    <div>{{ text1 }}</div>
    <el-button type="primary" @click="addFn">加</el-button>
    <el-button type="primary" @click="subFn">减</el-button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      back: false
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    text1: {
      get() {
        return this.$store.state.text;
      },
      set(val) {
        this.$store.commit("getParam", val);
      }
    }
  },
  methods: {
    goFrontFn() {
      this.back = true;
    },
    resetFn() {
      this.back = false;
    },
    addFn() {
      this.text1++;
    },
    subFn() {
      this.text1--;
    },
    setFn() {}
  }
};
</script>
<style lang="less" scoped>
.cardItem {
  position: relative;
  width: 158px;
  height: 246px;
  box-shadow: 0px 0px 35px #1e115f55;
  cursor: pointer;
  .front {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: rotateY(180deg) translateZ(0);
    transition: all 1s;
  }

  .back {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: rotateY(0deg) translateZ(0);
    transition: all 1s;
  }

  .tofront {
    transform: rotateY(180deg);
  }

  .toback {
    transform: rotateY(0deg);
  }

  img {
    width: 158px;
    height: 246px;
  }
}
</style>
