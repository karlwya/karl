<template>
  <div class="params">
    <!-- 级联选择器 -->
    <div style="margin-top: 15px">
      <span>选择商品分类：</span>
      <el-cascader
        clearable
        ref="cascader"
        :options="list"
        :props="goods"
        :show-all-levels="true"
        v-model="selectId"
        @change="handleChange"
      ></el-cascader>
    </div>

    <!-- 动态参数选项卡 -->
    <div style="margin-top: 15px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-table :data="manyTableData" style="width: 100%" border  size="medium">
            <el-table-column
              type="expand"
              label="明细"
              width="100"
              align="center"
             
            >
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attrVals"
                  :key="index"
                  closable
                  @close="handleClose(index,scope.row)"
                  >{{ item }}</el-tag
                >
                <!-- 文本输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- 添加按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attrName"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 静态参数选项卡 -->
        <el-tab-pane label="静态属性" name="second">
          <el-table :data="onlyTableData" style="width: 100%" border>
            <el-table-column
              type="expand"
              label="明细"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attrVals"
                  :key="index"
                  closable
                  >{{ item }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attrName"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //商品分类列表
      list: [],
      //指定级联选择器的配置对象
      goods: {
        value: "catId",
        label: "catName",
        children: "children",
        level: "catLevel",
        expandTrigger: "hover",
      },
      //被激活的页签名称(默认first)
      activeName: "first",
      //选中的商品分类的ID
      selectId: [],
      //动态属性的数据
      manyTableData: [],
      //静态属性的数据
      onlyTableData: [],
      // 参数编辑
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    //获取级联选择器数据
    async getClasstify() {
      const { data: res } = await this.$http.post("attr/queryCategoryList", {
        pageNum: 1,
        pageSize: 10,
      });
      this.list = res.data;
      // console.log(res.data);
    },

    //获取动态参数和静态参数
    async getParam() {
      if (this.selectId.length !== 3) {
        this.selectId = [];
        return;
      }
      // console.log(this.selectId);
      //获取接口数据
      const { data: res } = await this.$http.get(
        `attr/queryList/${this.cateId}`,
        {
          params: { sel: this.activeName == "first" ? "many" : "only" },
        }
      );
      if (res.status !== 200) {
        return this.$message.error("获取参数列表失败！");
      }

      //将字符串通过空格分割形成一个数组
      res.data.forEach((item) => {
        if (item.attrVals.length > 0) {
          item.attrVals = item.attrVals.split(" ");
        } else {
          item.attrVals = [];
        }
        (item.inputVisible = false), (item.inputValue = "");
      });

      // console.log(res.data);
      //判断动态参数还是静态参数，添加到不同的数组里
      if (this.activeName === "first") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    //点击按钮，显示输入文本框
    //$nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
    showInput(item) {
      item.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //编辑添加参数标签
    handleInputConfirm(item) {
      // console.log(item.attrVals);
      // console.log(item.inputValue);
      if (item.inputValue.trim().length === 0) {
        item.inputValue = "";
        item.inputVisible = false;
        return;
      } else {
        item.attrVals.push(item.inputValue);
        item.inputVisible = false;
        this.$message({ type: "success", message: "添加参数项成功!" });
      }
    },
    //删除添加的参数标签
    handleClose(index,val) {
      console.log(index);
      console.log(val);

      val.attrVals.splice(index, 1);
      this.$message({ type: "success", message: "删除参数项成功!" });
    },

    //Tab页签点击事件的处理函数
    handleClick() {
      this.getParam();
    },
    //商品级联选择项发生变化触发这个函数
    handleChange() {
      this.getParam();
    },
  },
  computed: {
    //当前选中的三级分类的ID
    cateId() {
      if (this.selectId.length === 3) {
        return this.selectId[2];
      }
      return null;
    },
  },
  created() {
    this.getClasstify();
  },
};
</script>
<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
