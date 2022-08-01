<template>
  <div class="order">
    <!-- 修改地址对话框 -->
    <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区/县" :label-width="formLabelWidth">
          <div class="block">
            <el-cascader :options="city" v-model="form.value"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 地理位置展示 -->

    <!-- 主体表格 -->
    <el-table :data="list" border style="margin-top: 15px" size="medium">
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>

      <el-table-column label="订单编号" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单价格（元）" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderPrice }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否付款" width="130" align="center">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.payStatus == '1' ? 'success' : 'danger'"
            size="small"
            style="margin-left: 10px"
            >{{ scope.row.payStatus == "1" ? "已付款" : "未付款" }}</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否发货" width="130" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isSend }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editAddress(scope.row.orderId)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-location-outline"
            size="mini"
            @click="show(scope.row.orderId)"
          ></el-button>
          <el-dialog :visible.sync="dialogVisible" width="40%" title="百度地图">
            <BaiduMap></BaiduMap>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器  -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import BaiduMap from "@/views/baidumap/BaiduMap.vue";
import city from "@/utils/citydata";
export default {
  data() {
    return {
      //分页器数据
      page: 1,
      currentPage: 1,
      total: null,
      pageSize: 9,
      list: [],

      //修改地址数据
      dialogVisible: false,
      dialogFormVisible: false,
      city,
      form: {
        address: "",
        delivery: false,
        value: [],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //请求用户列表
    async getUserlist() {
      const { data: res } = await this.$http.post("order/queryList", {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      this.list = res.data;
      this.total = res.count;
      console.log(res.data);
    },

    // 添加修改地址
    editAddress() {
      this.dialogFormVisible = true;
    },
    //展示物流信息
    show() {
      this.dialogVisible = true;
    },
    //解决分页器
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserlist();
    },
    //获取地址数据
    orderEdit() {
      console.log(this.form.value);
      console.log(this.form.address);
    },
  },
  created() {
    this.getUserlist();
  },
  components: {
    BaiduMap,
  },
};
</script>
<style lang="less" scoped>
.tables {
  text-align: center;
}
</style>
