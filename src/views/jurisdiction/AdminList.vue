<template>
  <div>
    <!-- 添加角色对话框 -->
    <el-button
      type="primary"
      @click="AddVisible = true"
      style="margin-top: 15px"
      >添加角色</el-button
    >
    <el-dialog title="添加角色" :visible.sync="AddVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="40%">
      <el-form ref="editUserFormRef" :model="editUserForm" label-width="70px">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="editUserForm.roleName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input
            v-model="editUserForm.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser(editUserForm)"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 权限分配弹窗 -->

    <!-- <el-dialog title="提示" :visible.sync="manergeVisible" width="30%">
            <el-tree show-checkbox :data="list" :props="treeProps">
            </el-tree>
            <span slot="footer" class="manerge-footer">
              <el-button @click="manergeVisible = false">取 消</el-button>
              <el-button type="primary" @click="disRole()">确 定</el-button >
            </span>
    </el-dialog> -->

    <!-- 表格内容主体 -->
    <el-table :data="list" style="width: 100%; margin-top: 15px" border>
      <el-table-column type="expand" label="明细" width="70px" align="center">
        <template slot-scope="scope">
          <!-- 渲染一级权限 -->
          <el-row v-for="item1 in scope.row.children" :key="item1.roleId">
            <el-col :span="5">
              <el-tag closable @close="remove(item1, scope.row.children)">{{
                item1.psName
              }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <!-- 二级权限 -->
            <el-col :span="19">
              <el-row v-for="item2 in item1.children" :key="item2.psId">
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="remove(item2, item1.children)"
                  >
                    {{ item2.psName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <!-- 三级权限 -->
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.psId"
                    closable
                    @close="remove(item3, item2.children)"
                  >
                    {{ item3.psName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column
        label="序号"
        width="70"
        prop=""
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        align="center"
      ></el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-setting"
            @click="manergeVisible = true"
            >分配权限</el-button
          >
          <MyRole :send.sync="manergeVisible"></MyRole>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import MyRole from "./MyRole.vue";
export default {
  data() {
    return {
      list: [],
      form: {
        roleName: "",
        roleDesc: "",
      },
      editUserForm: {
        roleName: "",
        roleDesc: "",
      },
      treeProps: {
        children: "children",
        label: "psName",
      },
      index: 0,
      formLabelWidth: "80px",
      AddVisible: false,
      editDialogVisible: false,
      manergeVisible: false,
    };
  },
  // prop:[],
  methods: {
    //获取权限信息列表
    async getList() {
      const { data: res } = await this.$http.post("role/queryList", {});
      this.list = res.data;
      this.list.forEach((item) => {
        item.psName = item.roleName;
      });
      // console.log(res.data);
    },

    //添加角色数据内容
    addUsers() {
      this.$confirm("是否确定添加角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.list.unshift({
            roleName: this.form.roleName,
            roleDesc: this.form.roleDesc,
          });
          this.AddVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
    },

    //修改当前角色信息
    handleEdit(index, val) {
      this.index = index;
      //  console.log(val);
      this.editDialogVisible = true;
      this.editUserForm.roleName = val.roleName;
      this.editUserForm.roleDesc = val.roleDesc;
    },
    editUser(val) {
      this.$confirm("是否修改该角色信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list[this.index].roleDesc = val.roleDesc;
          this.editDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },

    //删除当前行数据
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
            this.list.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分配权限

    //删除权限管理
    remove(index, val) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          val.splice(val.indexOf(index), 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
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
    this.getList();
  },
  components: {
    MyRole,
  },
};
</script>
<style lang="less" scoped></style>
