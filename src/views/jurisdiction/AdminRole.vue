<template>
  <div>
    <!-- 主体表格 -->
            <el-table :data="list"  border style="margin-top:15px" height="550px" size="medium"> 
                <el-table-column label="序号"  width="80" align="center" type="index">
                </el-table-column>

                <el-table-column label="权限名称"  align="center">
                 <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.psName }}</span>
                </template>
                </el-table-column>

                <el-table-column label="路径"  align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.path }}</span>
                </template>
                </el-table-column>

                <el-table-column label="权限等级" align="center" >
                <template slot-scope="scope">
                    <el-button type="warning" plain size="small"  >{{ scope.row.psLevel}}级</el-button>
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
      //分页器数据
      list: [],
      currentPage: 1, 
      pageSize: 9,
      total:null, 
    };
  },
  methods: {
    //请求用户列表
    async getPression() {
      const { data: res } = await this.$http.post("menu/permission", {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res);
      
      this.list = res.data;
      this.total = res.count
      console.log(res.data);
    },

    handleSizeChange(val) {
       this.currentPage = 1
       this.pageSize = val;
       this.getPression();
    },
    handleCurrentChange(val) {
       this.currentPage = val;
       this.getPression();
    },
  },
  created() {
    this.getPression();
  },
  components: {
    
  },
};
</script>
<style lang="less" scoped>
.tables {
  text-align: center;
}
</style>
