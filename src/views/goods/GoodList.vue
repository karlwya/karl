<template>
  <div>
    <!-- 商品添加按钮 -->
    <div style="margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请商品名称" v-model="input" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getGoods"></el-button>
             </el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="AddForm">添加商品</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 商品主体列表 -->
    <el-table :data="list" border style="margin-top: 10px" size="medium">
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品重量" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="200">
        <template>
          <span>{{ time | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="showEdit(scope.row.catId)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="remove(scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器  -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1, 10, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      total: null,
      pageSize: 9,
      count: 0,
      formLabelWidth: "100px",
      AddFormVisible: false,
      input: "",
      time: new Date(),
      form: {
        name: "",
        price: "",
        weight: "",
      },
    };
  },
  methods: {
    //获取商品信息列表
    async getGoods() {
      const { data: res } = await this.$http.post("goods/queryList", {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        goodsName: this.input,
      });
      this.list = res.data;
      this.total = res.count;
      console.log(res);
    },
    //删除当前行商品信息
    remove(index) {
      this.$confirm("此操作将永久删除该商品，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.list.splice(index,1)
          this.$message({ type: "success", message: "删除商品成功!" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    //分页器
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    //跳转到商品添加页面
    AddForm() {
      this.$router.push("/goods/queryList/add");
    },
    showEdit(){
      this.$router.push("/goods/queryList/edit");
    }
  },
  created() {
    this.getGoods();
  },
  // 格式化日期时间
  filters: {
    dateFormat(e) {
      let year = e.getFullYear();
      let month = e.getMonth() + 1;
      let date = e.getDate();
      let hours = e.getHours();
      hours = hours < 10 ? "0" + hours : hours;
      let min = e.getMinutes();
      min = min < 10 ? "0" + min : min;
      let sec = e.getSeconds();
      sec = sec < 10 ? "0" + sec : sec;
      return (
        year + "-" + month + "-" + date + "  " + hours + ":" + min + ":" + sec
      );
    },
  },
};
</script>
<style lang="less" scoped></style>
