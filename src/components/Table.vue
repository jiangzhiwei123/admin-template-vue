<template>
  <div>
    <!-- 导航条 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/table' }">表格</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 表单 -->
    <template>
      <!-- 表头搜索 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索条件">
          <el-input placeholder="请输入搜索条件" type="text" v-model="formInline.phase" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table :data="tableData" border size="mini" v-loading="loading.list" style="width: 100%">
        <el-table-column type="index" label="序号" min-width="80"></el-table-column>
        <el-table-column label="日期" min-width="200">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.startTime | formatDate }}</span>
              <span>至</span>
              <span>{{ scope.row.endTime | formatDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ getPublishStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="140">
          <template slot-scope="scope">
            <div>
              <!-- <img class="tableImg" :src="scope.row.img" /> -->
              <el-image style="width: 100px; height: 100px" :src="scope.row.img" :preview-src-list="[scope.row.img]">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="复制图片地址" min-width="100">
          <template slot-scope="scope">
            <div v-clipboard:copy="scope.row.img" v-clipboard:success="onCopy" v-clipboard:error="onError">
              复制图片地址
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" plain size="small" v-if="scope.row.status == 1">编辑</el-button>
              <el-button size="small" v-else @click="cancel()">取消</el-button>
              <el-button type="primary" size="small" @click="confirm()">确定</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    ></el-pagination>
  </div>
</template>
<script>
import formatDate from "../../public/js/date";

export default {
  data() {
    return {
      loading: {
        list: ""
      },
      formInline: {
        phase: ""
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      // return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading.list = true;
      this.$http.GetTableData({}).then(res => {
        this.loading.list = false;
        console.log(res);
        if (res.ret == 0) {
          this.tableData = res.model.data;
        }
      });
    },
    //搜索条件重置
    onReset() {
      this.formInline = {};
    },
    // 按条件搜索
    onSearch() {
      console.log(this.formInline);
      this.getData();
    },
    onCopy() {
      this.$message.success("复制成功");
    },
    onError() {
      this.$message.error("复制失败");
    },
    getPublishStatus(status) {
      if (status === 1) {
        return "未开始";
      } else if (status === 0) {
        return "进行中";
      } else {
        return "已结束";
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = [];
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableData = [];
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
.tableImg {
  width: 140px;
}
</style>
