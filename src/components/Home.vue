<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <img src="../assets/logo_small.svg" />
      <span> 我的文件 </span>
      <el-button type="primary" icon="el-icon-user" circle></el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <!-- 新增按钮 -->
            <el-button type="primary" class="new" @click="newFile"
              >新建</el-button
            >
            <!-- 选项菜单 -->
            <el-menu
              class="el-menu-vertical-demo"
              :router="true"
            >
              <!-- 一级目录 -->
              <el-menu-item index="/files">
                <i class="el-icon-house"></i>
                <span slot="title">我的文件</span>
              </el-menu-item>
              <!-- 一级目录 -->
              <el-menu-item index="/trashbin">
                <i class="el-icon-delete"></i>
                <span slot="title">回收站</span>
              </el-menu-item>
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
export default {
  data() {
    return {
      menulist: [],
    };
  },
  created() {
    // this.getMenuList()
  },
  methods: {
    //获取菜单
    // async getMenuList(){
    //   const {data: res} = await this.$http.get('menus');
    //   if(res.code !== 1) return this.$message.error(res.msg)
    //   this.menulist = res.data
    // }

    // 新建文件
    newFile() {},

    // // 切换到file组件
    // tofiles() {
    //   this.$router.push("/files");
    // },

    // // 切换到delete组件
    // todelete() {
    //   this.$router.push("/trashbin");
    // },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #fff;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 2px -2px rgb(200 200 200 / 15%);
  border-bottom-style: solid;
  border-width: 2px;
  border-color: #d6d6d6;
  > img {
    width: 120px;
    height: 34.362px;
  }
  > span {
    margin-right: 150px;
  }
}

.el-aside {
  background-color: #f4f4f4;
  color: #000;
  text-align: center;
  height: 100%;
  padding-left: 0;
}

.el-main {
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
}

.el-col {
  width: 100%;
}

.new {
  margin-top: 20px;
  width: 120px;
  height: 40px;
  text-align: center;
  justify-content: center;
}

.el-menu {
  width: 220px;
  transform: translateX(-20px);
  background-color: #f4f4f4;
  text-align: left;
  padding-left: 20%;
}
</style>