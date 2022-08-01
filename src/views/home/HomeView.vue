<template>
  <div class="home-container">
    <MyHead></MyHead>
    <el-container>
      <el-aside :width="isCollapse ? '200px' : '64px'">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="!isCollapse"
          router
          unique-opened=""
        >
          <el-menu-item @click="isCollapse = !isCollapse">
            <i v-show="!isCollapse" class="el-icon-s-fold"></i>
            <i v-show="isCollapse" class="el-icon-s-unfold"></i>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu
            :index="item.psId + ''"
            v-for="item in list"
            :key="item.psId"
          >
            <template slot="title">
              <i :class="icon[item.psId]"></i>
              <span slot="title">{{ item.psName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + items.path"
              v-for="items in item.children"
              :key="items.psId"
            >
              <i :class="icons[items.psId]"></i>
              <span>{{ items.psName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in breadList"
            :key="item.path"
            :to="{ path: item.path }"
          >
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-click="tabClick"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
            :ref="item.ref"
          >
          </el-tab-pane>
        </el-tabs> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHead from "../../components/Head/MyHead";
export default {
  data() {
    return {
      isCollapse: true,
      showBread: true,
      list: [],
      icon: {
        145: "el-icon-s-home",
        125: "el-icon-user",
        101: "el-icon-shopping-bag-2",
        103: "el-icon-setting",
        102: "el-icon-collection-tag",
      },
      icons: {
        146: "el-icon-help",
        110: "el-icon-menu",
        104: "el-icon-goods",
        115: "el-icon-share",
        121: "el-icon-view",
        111: "el-icon-coordinate",
        112: "el-icon-guide",
        107: "el-icon-thumb",
      },
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "首页",
          name: "1",
          content: "Tab 1 content",
          closable: false,
          ref: "tabs",
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content",
        },
      ],
      tabIndex: 2,
    };
  },
  methods: {
    async getMenu() {
      const res = await this.$http.post("menu/queryList", {});
      let datas = res.data.data;
      this.list = datas;
      // console.log(datas);
    },
    tabClick(tab) {
      console.log(tab);
    },
    removeTab() {},
  },
  computed: {
    breadList() {
      return this.$route.matched;
    },
  },

  mounted() {
    this.getMenu();
  },
  components: {
    MyHead,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  overflow: hidden;

  .el-container {
    height: 100%;
    overflow: hidden;
    .el-main {
      height: 100%;
      overflow: hidden;
    }
    .el-aside {
      height: 100vh;
      color: #333;
      border-right: 1px solid #eee;
      background: #fff;
      // position: relative;
      i {
        font-size: 25px;
      }
    }
    .el-menu {
      overflow: hidden;
      border-right: 0px;
      // background-color: rgb(73, 60, 60);
    }
  }
}

.el-breadcrumb {
  border-bottom: 1px solid #ddd;
  padding: 5px;
}
</style>
