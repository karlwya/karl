<template>
  <div>
    <el-dialog title="分配权限" :visible="send" width="30%">
      <el-tree
        show-checkbox
        :data="list"
        :props="treeProps"
        node-key="roleId"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="disRole()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["send"],
  data() {
    return {
      list: [],
      treeProps: {
        children: "children",
        label: "psName",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getList() {
      const { data: res } = await this.$http.post("role/queryList", {});
      console.log(res.data);
      this.list = res.data;
      this.list.forEach((item) => {
        item.psName = item.roleName;
      });
    },
    disRole() {
      this.$emit("update:send", false);
      this.$message({
        type: "success",
        message: "分配权限成功!",
      });
    },
    cancel() {
      this.$emit("update:send", false);
      this.$message({
        type: "warning",
        message: "取消分配权限!",
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped lang="less">
:deep .el-icon-close {
  display: none;
}
</style>
