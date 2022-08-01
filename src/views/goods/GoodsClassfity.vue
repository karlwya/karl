<template>
  <div>
    <!-- 添加分类 -->
    <div style="margin-top: 10px">
      <el-button type="primary" @click="dialogFormVisible = true" size="medium"
        >添加分类</el-button
      >
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.catName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否有效" :label-width="formLabelWidth">
            <el-input
              v-model.number="addForm.catDeleted"
              autocomplete="off"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input
              v-model.number="addForm.catLevel"
              autocomplete="off"
              type="number"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClasstify">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div style="margin-top: 10px">
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        border
        :show-row-hover="true"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.catDeleted === 0"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 一二三级菜单排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.catLevel === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.catLevel === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>

        <!-- <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="remove(scope.$index)"
            >删除</el-button
          >
        </template> -->
      </tree-table>

      <!-- 分页器  -->
      <div class="block" style="margin-top: 5px">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      catelist: [],
      currentPage: 1,
      total: null,
      pageSize: 10,
      count: 0,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      addForm: {
        catName: "",
        catDeleted: "",
        catLevel: "",
      },
      columns: [
        {
          label: "分类名称",
          prop: "catName",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
          align: "center",
          headerAlign: "center",
        },
      ],
    };
  },
  methods: {
    async getCategory() {
      const { data: res } = await this.$http.post("category/queryList", {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res.data);
      this.catelist = res.data;
      this.total = res.count;
    },
    //添加分类
    addClasstify() {
      this.catelist.unshift({
        catName: this.addForm.catName,
        catDeleted: this.addForm.catDeleted,
        catLevel: this.addForm.catLevel,
      });
      this.dialogFormVisible = false;
    },
    //分页器
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getCategory();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCategory();
    },
    showEdit() {},
     remove(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          console.log(index);
          
          this.catelist.splice(index,1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getCategory();
  },
};
</script>
<style lang="less" scoped></style>
