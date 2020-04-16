<template>
  <div class="header">
    <img class="logo-img" :src="require('../assets/images/logo-2.png')" alt="logo" />
    <div class="head-name">xxx后台管理系统</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="user-item el-dropdown-link">
          <img class="user-img" :src="require('../assets/images/logo.png')" />
          {{ username }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "管理员"
    };
  },
  computed: {
    username() {
      let username = this.$store.state.nick;
      return username || this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "loginout") {
        this.$http.Logout().then(res => {
          if (res.ret === 0) {
            this.$router.push("/login");
            this.$message({ message: "退出登录成功", type: "success" });
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 70px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background: #242f42;
  .logo-img {
    width: auto;
    height: 33.5px;
    float: left;
    margin: 20px 33px 0 22px;
  }
  .head-name {
    color: #fff;
    font-size: 22px;
    height: 70px;
    line-height: 72px;
    float: left;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-img {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-item {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
    line-height: 70px;
  }
}
</style>
