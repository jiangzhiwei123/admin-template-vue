<template>
  <div class="sidebar">
    <el-menu
      background-color="#242f42"
      text-color="#fff"
      theme="dark"
      :default-active="onRoute"
      @select="actTitle"
      :collapse="false"
      router
    >
      <template v-for="(item, index) in items">
        <!-- 有子选项 -->
        <template v-if="item.subs && item.subs.length > 0">
          <el-submenu :index="item.index" :key="index">
            <template slot="title">
              <i
                :class="item.icon"
                :style="{
                  color: actTitleIdx === item.index ? actColor : 'rgb(255, 255, 255)'
                }"
              ></i>
              <span
                :style="{
                  color: actTitleIdx === item.index ? actColor : 'rgb(255, 255, 255)'
                }"
                >{{ item.title }}</span
              >
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(subItem, index2) in item.subs" :key="index2" :index="subItem.index">
                <span
                  :style="{
                    color: actTitleIdx === subItem.index ? actColor : 'rgb(255, 255, 255)'
                  }"
                  >{{ subItem.title }}</span
                >
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <!-- 无子选项 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actTitleIdx: "", // 选中激活的颜色
      actColor: "#409EFF",
      items: [
        {
          icon: "el-icon-view",
          title: "组件",
          index: "1",
          subs: [
            {
              index: "table",
              title: "表格"
            },
            {
              index: "upload",
              title: "上传"
            },
            {
              index: "editor",
              title: "富文本"
            }
          ]
        },
        {
          icon: "el-icon-view",
          title: "移动端",
          index: "2",
          subs: [
            {
              index: "lottery",
              title: "翻翻乐"
            },
            {
              index: "sprite",
              title: "精灵图"
            }
          ]
        }
      ]
    };
  },
  methods: {
    actTitle(index) {
      this.actTitleIdx = index;
    }
  },
  computed: {
    onRoute() {
      return this.$route.path.replace("/", "");
    }
  },
  watch: {
    actTitleIdx(val) {
      sessionStorage.setItem("menuIndex", val);
    },
    onRoute(val) {
      this.actTitleIdx = val;
    }
  },
  created() {
    const index = sessionStorage.getItem("menuIndex");
    this.actTitleIdx = index ? index : "table";
    console.log(this.actTitleIdx);
  }
};
</script>
<style lang="less" scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 190px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item {
  color: #fff;
}
.el-menu-item,
.el-submenu__title {
  color: #fff;
}
.el-menu {
  background: #242f42;
}
.el-menu-item {
  background: #242f42;
}
.el-submenu__title:hover {
  color: #434c57;
}
.el-menu {
  overflow: hidden;
}
.el-menu-item-group {
  background: #0d151f !important;
}
.el-menu-item-group .el-menu-item {
  background: #0d151f !important;
}
</style>
