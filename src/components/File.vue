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
      <div class="file-list-item" @click="openfile">
        <div class="file-img-container">
          <img src="../assets/file_img.png" alt="" />
        </div>
        <div class="file-name">
          <span>
            <i class="el-icon-share"></i>
            <label>思维导图</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openfile() {
      console.log("很好");
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
}

.file-name {
  text-align: center;
}
</style>