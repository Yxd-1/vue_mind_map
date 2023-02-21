<template>
  <el-container class="home-container">    
    <!-- 头部区域 -->
    <el-header>
      <img
        src="../assets/logo_small.svg"
        style="cursor: pointer"
        @click="backhome"
      />
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <!-- 新增按钮 -->
            <el-button type="primary" class="new" @click="createFile">新建</el-button>
            <!-- 选项菜单 -->
            <el-menu default-active="$route.path" 
            class="el-menu-vertical-demo" :router="true" 
            background-color= rgb(245,217,217)
            text-color="#606266" 
            active-text-color="#000000">
              <!-- 一级目录 -->
              <el-menu-item index="/files">
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!-- 一级目录 -->
              <el-menu-item index="/trashbin">
                <i class="el-icon-delete"></i>
                <span slot="title">回收站</span>
              </el-menu-item>
              <!-- 一级目录 -->
              <el-menu-item index="/users">
                <i class="el-icon-user"></i>
                <span slot="title">用户中心</span>
              </el-menu-item>
              <!-- 一、二级目录 -->
              <el-submenu index="7">
                <template slot="title">
                 <i class="el-icon-more"></i>
                 <span>其他</span>
                </template>
                <el-menu-item index="/upload"><i class="el-icon-upload"></i>上传</el-menu-item>
                <el-menu-item index="7-2"><i class="el-icon-upload2"></i>导出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    // 返回起始页面
    backhome() {
      this.$router.push("/welcome");
    },

    // 新建文件
    createFile() {
      this.$router.push("/mindmap");
    },

  },
};
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}

.el-header{
  background-color: rgb(241, 187, 192);
  // background-image: url("D:\xmind\vue_mind_map\src\assets\background.jpg");
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-style: double;
  border-width: 2px;
  border-color: rgb(241, 187, 192);
  > img {
    width: 120px;
    height: 34.362px;
  }
  > span {
    margin-right: 150px;
  }
}

.el-aside {
  background-color:rgb(245,217,217);
  // background-image: url("D:\xmind\vue_mind_map\src\assets\background.jpg");
  // color: rgb(199, 32, 32);
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #ffffff;
  color: rgb(33, 33, 33);
  text-align: center;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 100%;
}

.new {
  margin-top: 20px;
  width: 120px;
  height: 40px;
  text-align: center;
  justify-content: center;
}

.el-menu {
  width: 100%;
  background-color: rgb(245,217,217);
  // background-image: url("D:\xmind\vue_mind_map\src\assets\background.jpg");
  text-align: left;
  border-right-width: 0;
}

.el-menu-vertical-demo {
  width: 90%;
  transform: translateX(10%);
}
</style>