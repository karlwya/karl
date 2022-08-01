<template>
  <div class="add-container">
    <div style="margin-top:15px">
      <el-alert
      title="商品添加"
      type="warning"
      center
      show-icon>
    </el-alert>
    </div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb> -->

    <div class="steps">
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息" name="0"></el-step>
        <el-step title="商品参数" name="1"></el-step>
        <el-step title="商品属性" name="2"></el-step>
        <el-step title="商品图片" name="3"></el-step>
        <el-step title="商品内容" name="4"></el-step>
        <el-step title="完成" name="5"></el-step>
      </el-steps>
    </div>

    <!-- 基本信息 -->
    <div class="left-tab">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        width="40%"
      >
        <el-tabs :tab-position="tabPosition" style="height: 100%; width: 87%" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="weight">
              <el-input v-model="addForm.weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="number">
              <el-input v-model="addForm.number" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品参数 -->
          <el-tab-pane label="商品参数" name="1">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="动态"></el-checkbox>
              <el-checkbox label="静态"></el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>

          <!-- 商品属性 -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item>
              <el-input v-model="addForm.attrVals" placeholder="请输入商品属性" ></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品图片  -->
          <el-tab-pane label="商品图片" name="3">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>

          <!-- 商品内容 -->
          <el-tab-pane label="商品内容" name="4">
            <div style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                style="height: 350px; overflow-y: hidden"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="商品提交" name="5">
            <el-button type="primary" @click="addGodds">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
export default {
  data() {
    return {
      tabPosition: "left",
      labelPosition: "top",
      checkList: [],
      activeIndex: 0,
      editor: null,
      html: "<p></p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
      addForm: {
        name: "",
        price: "",
        weight: "",
        number: "",
        attrVals: "",
      },
      //添加商品的表单校验规则
      addFormRules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);
    },
    addGodds() {
      this.$refs.addFormRef.validate(async (val) => {
        if (!val) {
          return this.$message.error("请填写完整内容后提交");
        } else {
          this.$message.success("添加商品成功");
          this.$router.push("/goods/queryList");
        }
      });
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy();
  },
  components: {
    Editor,
    Toolbar,
  },
};
</script>
<style lang="less" scoped>
.steps,
.left-tab {
  margin-top: 15px;
}
.add-container {
  height: 100vh;
}
.w-e-text-container {
  height: 700px !important;
}
</style>
