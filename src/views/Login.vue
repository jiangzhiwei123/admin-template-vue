<template lang="html">
  <div class="login-wrap">
    <div class="login-head">xxx后台管理系统</div>
    <div class="login-body">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="userMobile">
          <el-input v-model="ruleForm.userMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" class="input-style" placeholder="验证码" v-model="ruleForm.password"></el-input>
          <el-button type="primary" class="get-code" @click="getCode" :loading="loading.getCode">{{ time }}</el-button>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="btnLogin" :loading="loading.submit">登录</el-button>
        </div>
        <p class="tips">
          Tips : 请输入完整信息
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userMobile: "",
        password: ""
      },
      rules: {
        userMobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      loading: {
        submit: false,
        getCode: false
      },
      time: "获取", // 倒计时
      timeKey: true
    };
  },
  methods: {
    /* 验证码登录 */
    submitForm() {
      return new Promise(resolve => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.loading.submit = true;
            this.$http
              .Login({
                mobile: this.ruleForm.userMobile,
                code: this.ruleForm.password
              })
              .then(
                response => {
                  this.loading.submit = false;
                  if (response.ret === -1) {
                    this.$message.error("登录超时");
                  } else if (response.ret !== 0) {
                    this.$message.error(response.msg);
                  } else {
                    this.$message({ message: "登陆成功", type: "success" });
                    localStorage.setItem("hasLogin", true);
                    this.$store.commit("SET_NICK", response.model.name); // 管理员姓名
                    this.$store.commit("SET_LEVEL", response.model.level); // 管理员等级
                    this.$router.push("/home");
                    resolve();
                  }
                },
                () => {
                  this.$message.error("网络异常,请刷新重试");
                }
              );
          } else {
            this.loading.code = false;
          }
        });
      });
    },
    btnLogin() {
      this.submitForm().then();
    },
    getCode() {
      if (this.ruleForm.userMobile === "" || !/^1\d{10}$/.test(this.ruleForm.userMobile)) {
        this.$message.error("手机号码输入格式有误");
        return;
      }
      if (!this.timeKey) return;
      this.timeKey = false;
      this.loading.getCode = true;
      this.$http.GetCode({ mobile: this.ruleForm.userMobile }).then(
        response => {
          this.loading.getCode = false;
          let timeT = 60;
          if (response.ret === 0) {
            this.$message({ message: "发送验证码成功", type: "success" });
            const sTime = setInterval(() => {
              timeT--;
              this.time = `${timeT}s`;
              if (timeT < 0) {
                timeT = 0;
                this.time = "获取";
                clearInterval(sTime);
                this.timeKey = true;
              }
            }, 1000);
          } else if (response.ret === -1) {
            this.$message.error("登录超时");
          } else {
            this.$message.error(response.msg);
            this.timeKey = true;
          }
        },
        () => {
          this.$message.error("网络异常,请刷新重试");
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background: #324157;
}
.login-head {
  text-align: center;
  font-size: 30px;
  color: #fff;
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
}
.login-body {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.tips {
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.input-style {
  width: 70%;
}
.get-code {
  float: right;
}
</style>
