<template>
  <div>
    <div class="dir">
      <span id="icon">
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-upload" circle></el-button>
        <el-button icon="el-icon-s-unfold" circle></el-button>
      </span>
      <span id="dir_root">我的文件</span>
    </div>
    <div class="file-list">
      <div class="file-list-item" v-for="fileListItem in fileList" :key="fileListItem.id" @click="openfile">
        <div class="file-img-container">
          <img :src="fileListItem.imgsrc" alt="" />
        </div>
        <div class="file-name">
          <span>
            <i class="el-icon-share"></i>
            <label>{{fileListItem.themename}}</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          id: "1",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "2",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "3",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "4",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "5",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "6",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
        {
          id: "7",
          imgsrc: require("../assets/file_img.png"),
          themename: "思维导图",
        },
      ],
    };
  },
  created() {
    // this.getFileList();
  },
  methods: {
    // 查询文件列表
    // async getFileList() {
    //   const { data: res } = await this.$http.get("files");
    //   if (res.code !== 1) return this.$message.error(res.msg);
    //   this.fileList = res.data;
    // },

    openfile() {
      this.$router.push("/mindmap");
    },
  },
};
</script>

<style lang="less" scoped>
#dir_root {
  text-align: left;
  display: block;
}

#icon {
  text-align: right;
  display: block;
}

.file-list {
  margin-top: 20px;
  text-align: left;
  vertical-align: top;
}

.file-list-item {
  width: 220px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 39px;
  margin-bottom: 15px;
}

.file-name {
  text-align: center;
}
</style>