<template>
  <div>
<!-- 添加用户对话框 -->
    <el-button type="primary" @click="dialogFormVisible = true" style="margin-top:10px">添加用户</el-button>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="50%" @close="addDialogClosed">
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adds">确 定</el-button>
      </div>
    </el-dialog>

  <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form ref="editUserFormRef" :model="editUserForm"  label-width="70px" @close="editDialogClosed" >
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.userTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </span>
    </el-dialog>


    <!-- 主体表格 -->
            <el-table :data="list"  border style="margin-top:10px" size="medium">
                <el-table-column label="序号"  width="100" align="center" height="40px">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{(page-1)*9+scope.$index+1 }}</span>
                </template>
                </el-table-column>
                <el-table-column label="姓名" width="250" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.username }}</p>
                    <p>性别: {{ scope.row.userSex }}</p>
                    <div slot="reference" class="name-wrapper">
                       <span>{{ scope.row.username }}</span>
                    </div>
                    </el-popover>
                </template>
                </el-table-column>
                <el-table-column label="邮箱" width="300" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userEmail }}</span>
                </template>
                </el-table-column>
                <el-table-column label="电话" width="300" align="center" >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userTel }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.userId)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.userId)" ></el-button>
                </template>
                </el-table-column>
            </el-table>
          

    <!-- 分页器  -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[ 1,10, 20, 50]"
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
      page:1,
      list: [],
      currentPage: 1, 
      total: null, 
      pageSize: 9,
      // 控制添加用户对话框的显示与隐藏
      dialogFormVisible: false,
      //添加用户表单数据
      addForm:{
          username:'',
          password:'',
          email:'',
          mobile:'',
      },
    addFormRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '邮箱格式不正确', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/,message: '手机号码格式不正确', trigger: 'blur' }
          ],
      },
      //修改用户表单数据
      editDialogVisible:false,
      editUserForm:{},
      editUserFormRules: {
       email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '邮箱格式不正确', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/,message: '手机号码格式不正确', trigger: 'blur' }
          ],
      },
    };
  },


  methods: {
    //请求用户列表
    async getUserlist() {
      const { data: res } = await this.$http.post("user/queryList", {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      this.list = res.data;
      this.total = res.count
      // console.log(res);
    },

   //添加用户
   async addUser() {
      const { data: res } = await this.$http.post("user/saveSingle", {
        username: this.addForm.username,
        password: this.addForm.password,
        userEmail: this.addForm.email,
        userTel: this.addForm.mobile,
      });
     console.log(res);
    },
    adds(){
          this.addUser()
          this.dialogFormVisible = false
          this.getUserlist();    
    },
     addDialogClosed(){
        this.$refs.addFormRef.resetFields()
    },

  // 修改用户
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(`user/querySingle/${id}`)
      if (res.status !== 200){
        return this.$message.error('查询失败！')
      } 
      this.editDialogVisible = true
      this.editUserForm = res.data
    },
     editUser() {
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid){
               return
        }else{
            const { data: res } = await this.$http.put(`user/updateSingle`,{ 
            userId:this.editUserForm.userId,
            userEmail: this.editUserForm.userEmail, 
            userTel: this.editUserForm.userTel 
          }
        )
        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        this.editDialogVisible = false
        this.getUserlist()
        this.$message.success('更新用户信息成功！')
        }      
      })
    },
     editDialogClosed() {
      this.$refs.editUserFormRef.resetFields()
    },

    // 根据ID删除用户
    removeUser(userId){
        this.$confirm('确定要删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const {data:res} = await this.$http.delete(`user/deleteSingle/${userId}`)
          if(res.status !== 200){
              return this.$message.error('删除用户失败')
          }else{
           this.getUserlist()
          this.$message.success('删除用户成功!')
          }
        })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
       this.currentPage = 1
       this.pageSize = val;
       this.getUserlist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
       this.currentPage = val;
       this.getUserlist();
    },
  },
  created() {
    this.getUserlist();

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
