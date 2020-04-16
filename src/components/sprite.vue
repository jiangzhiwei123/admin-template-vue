<template>
  <div>
    <div class="sprite" :class="{ spriteAnimation: isActive }"></div>
    <el-checkbox :model="checked" @change="show">备选项</el-checkbox>
    <div @click="goFn">执行动画</div>
    <div @click="resetFn">复原</div>
    <br />
    <div>{{ text1 }}</div>
    <div>{{ text }}</div>
    <el-button type="primary" @click="setFn">设置</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      back: false,
      checked: 1,
      isActive: false
    };
  },
  created() {
    // console.log(this.checked);
  },
  computed: {
    ...mapState(["text"]),

    text1: {
      get() {
        return this.$store.state.text;
      },
      set(val) {
        this.$store.commit("getParam", val);
      }
    }
    // text() {
    //   return this.$store.state.text;
    // }
  },
  methods: {
    ...mapMutations(["getParam"]),
    show(val) {
      console.log(val);
      if (val === true) {
        this.checked = 111;
      } else {
        this.checked = 111;
      }
      console.log(this.checked);
    },
    valueFn() {
      if (this.checked === 1) {
        return true;
      } else {
        return false;
      }
    },
    goFn() {
      this.isActive = true;
    },
    resetFn() {
      this.isActive = false;
    },
    setFn() {
      setTimeout(() => {
        // this.text1 = 10;
        this.text = 10;
        // this.getParam(10);
      }, 2000);
    }
  }
};
</script>
<style lang="less" scoped>
.sprite {
  position: absolute;
  top: 370px;
  width: 750px;
  // width: 25500px;
  height: 357px;
  background: url(../assets/images/sprite.png) no-repeat;
  background-size: 3400% 100%;
  z-index: 8;
}
.spriteAnimation {
  //循环播放
  // animation: spritechange steps(34, end) 2s infinite;
  // 只播放一次
  animation: spritechange steps(34, end) 2s 1;
  /* @keyframes duration | timing-function | delay | name */
}
@keyframes spritechange {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -25500px 0;
  }
}
// @keyframes spritechange {
//   0% {
//     background-position: 0 0;
//   }

//   33% {
//     background-position: -25500px 0;
//   }
//   34% {
//     background-position: 0 0;
//   }
//   66% {
//     background-position: -25500px 0;
//   }
//   67% {
//     background-position: 0 0;
//   }
//   100% {
//     background-position: -25500px 0;
//   }
// }
</style>
