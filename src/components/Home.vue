<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <img src="../assets/logo_small.svg" style="cursor: pointer" @click="backhome" />
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <!-- 新增按钮 -->
            <span><el-button type="primary" class="new" @click="gotolink2">新建</el-button></span>
            <el-button type="success" class="new" @click="gotolink">上传</el-button>

            <el-dialog title="新建文件" :visible.sync="dialogForm2Visible" center="false">
              <el-form :model="addfileForm" label-width="120px">
                <el-form-item label="文件主题" label-width="120px">
                  <el-select v-model="region" placeholder="请选择文件主题">
                    <el-option label="学习工作" value="study"></el-option>
                    <el-option label="生活娱乐" value="play"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件名称" label-width="120px">
                  <el-input v-model="addfileForm.theme" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm2Visible = false">取 消</el-button>
                <el-button type="primary" @click="createFile">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="上传本地文件" :visible.sync="dialogFormVisible" center="false">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="请选择文件" label-width="100px">
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                    :limit="3" :on-exceed="handleExceed" :file-list="fileList2">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip"><h3>只能上传jpg/png文件,且不超过500kb</h3></div> -->
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <!-- 选项菜单 -->
            <el-menu default-active="$route.path" class="el-menu-vertical-demo" :router="true"
              background-color="rgb(245,217,217)" text-color="#606266" active-text-color="#000000">
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
    return {
      dialogFormVisible: false,
      dialogForm2Visible: false,

      fileList2: [
        {
          name: "mindmap.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "mindmap2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],

      region: '',
      addfileForm: {
        id: '',
        theme: '',
        uid: 1,
        deleted: 0,
      },
    };
  },
  created() { },
  methods: {
    // 返回起始页面
    backhome() {
      this.$router.push("/welcome");
    },

    // 新建文件
    async createFile() {
      const { data: res } = await this.$http.post("themes", this.addfileForm);
      if (res.code != 1) {
        this.$message.error(res.code);
        this.$router.push("/files");
      }
      this.$message.success("新增成功");
      this.$router.push("/files");
    },

    gotolink() {
      this.dialogFormVisible = true;
    },

    gotolink2() {
      this.dialogForm2Visible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
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

  >img {
    width: 120px;
    height: 34.362px;
  }

  >span {
    margin-right: 150px;
  }
}

.el-aside {
  background-color: rgb(245, 217, 217);
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

.new1 {
  margin-top: 20px;
  width: 120px;
  height: 40px;
  text-align: center;
  justify-content: center;
}

.el-menu {
  width: 100%;
  background-color: rgb(245, 217, 217);
  // background-image: url("D:\xmind\vue_mind_map\src\assets\background.jpg");
  text-align: left;
  border-right-width: 0;
}

.el-menu-vertical-demo {
  width: 90%;
  transform: translateX(10%);
}
</style>