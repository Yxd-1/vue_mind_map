<template>
  <div>
    <div class="dir">
      <span id="dir_root">我的文件</span>
    </div>

    <div class="search-container">
      <div class="inputBox">
        <input
          type="text"
          placeholder="输入文件名称"
          v-model="keywords"
          @keydown.enter="getData($event)"
          @keyup="search"
          @blur="hiddenData"
        />
        <div class="search"></div>
      </div>
    </div>

    <div>
      <span id="ss"
        >搜索记录:
        <span
          class="search-history"
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="ressetSearch(item)"
        >
          {{ item }} &nbsp;
        </span>
      </span>
    </div>

    <div class="file-list">
      <div
        class="file-list-item"
        v-for="fileListItem in fileList"
        :key="fileListItem.id"
      >
        <div style="width: 220px" v-if="fileListItem.deleted == 0">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="fileListItem.imgsrc"
              @click="openfile"
              class="image"
              alt=""
            />
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding: 14px;
              "
            >
              <span
                ><i class="el-icon-share"></i>
                <label>{{ fileListItem.themename }}</label></span
              >
              <el-popover placement="right" width="160" trigger="click">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                  "
                >
                  <el-button
                    icon="el-icon-edit"
                    size="medium"
                    circle
                    @click="editName(fileListItem)"
                    >重命名</el-button
                  >
                  <el-button
                    icon="el-icon-delete"
                    size="medium"
                    circle
                    @click="deleteFile(fileListItem)"
                    >删除</el-button
                  >
                </div>
                <el-button
                  slot="reference"
                  icon="el-icon-more"
                  size="small"
                  circle
                ></el-button>
              </el-popover>
            </div>
          </el-card>
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
          id: 1,
          imgsrc: require("../assets/file_img.png"),
          themename: "电磁场",
          deleted: 0,
        },
        {
          id: 2,
          imgsrc: require("../assets/file_img.png"),
          themename: "通信电子线路",
          deleted: 0,
        },
        {
          id: 3,
          imgsrc: require("../assets/file_img.png"),
          themename: "通信原理",
          deleted: 0,
        },
        {
          id: 4,
          imgsrc: require("../assets/file_img.png"),
          themename: "计算机网络技术",
          deleted: 0,
        },
        {
          id: 5,
          imgsrc: require("../assets/file_img.png"),
          themename: "数字信号处理",
          deleted: 0,
        },
        {
          id: 6,
          imgsrc: require("../assets/file_img.png"),
          themename: "软件课设",
          deleted: 0,
        },
        {
          id: 7,
          imgsrc: require("../assets/file_img.png"),
          themename: "JAVA",
          deleted: 0,
        },
      ],

      goodsList: [
        {
          id: 1,
          imgsrc: require("../assets/file_img.png"),
          themename: "电磁场",
          deleted: 0,
        },
        {
          id: 2,
          imgsrc: require("../assets/file_img.png"),
          themename: "通信电子线路",
          deleted: 0,
        },
        {
          id: 3,
          imgsrc: require("../assets/file_img.png"),
          themename: "通信原理",
          deleted: 0,
        },
        {
          id: 4,
          imgsrc: require("../assets/file_img.png"),
          themename: "计算机网络技术",
          deleted: 0,
        },
        {
          id: 5,
          imgsrc: require("../assets/file_img.png"),
          themename: "数字信号处理",
          deleted: 0,
        },
        {
          id: 6,
          imgsrc: require("../assets/file_img.png"),
          themename: "软件课设",
          deleted: 0,
        },
        {
          id: 7,
          imgsrc: require("../assets/file_img.png"),
          themename: "JAVA",
          deleted: 0,
        },
      ], //所有的数据
      keywords: "", //input框绑定的关键字
      result: [], //搜索结果，是一个数组
      data: [], //实时的搜索的数据
      searchHistory: [], //搜索记录

      editNameVisible: false,
      deleteFileVisible: false,
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    openfile() {
      this.$router.push("/mindmap");
    },
    search() {
      // 每次搜索前 把之前的数据清空
      this.result = [];
      // 遍历拿到item，并判断值是否和input框相似，一样就添加到result数组中
      this.goodsList.map((item, index) => {
        if (item.themename.includes(this.keywords)) {
          this.result.push(item);
        }
      });
      this.fileList = this.result;
    },
    // 实时的搜索的数据  根据传的参数，拿到event的对象
    getData(event) {
      // 监听event的事件  当键盘码是13的话，就让实时的列表隐藏
      if (event.keyCode == 13) {
        //存数据之前  如果历史记录中有的话，就不让添加  ！取反
        if (!this.searchHistory.includes(this.keywords)) {
          // 搜索记录会添加那些的input框的关键字
          this.searchHistory.push(this.keywords);
        }
      }
    },
    // 当他失去焦点的时候，会隐藏实时的列表
    hiddenData() {},
    // kw就是传过来的值item，意思就是点击历史记录的词，会重新返回到input输入框
    ressetSearch(kw) {
      this.keywords = kw;

      // 小bug，返回input框后应该再进行一次查询
      this.search();
    },
    // 重命名
    editName(item) {
      console.log(item);
      this.$prompt("重命名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.themename,
      })
        .then(({ value }) => {
          (item.themename = value),
            this.$message({
              type: "success",
              message: "修改成功 ",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    // 删除
    deleteFile(item) {
      console.log(item);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          item.deleted = 1;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
#dir_root {
  text-align: center;
  display: block;
  font-size: 28px;
}

#btn {
  text-align: right;
  display: block;
}

#ss {
  text-align: left;
  display: block;
  font-size: 16px;
}

.file-list {
  margin-top: 20px;
  text-align: center;
  vertical-align: top;
}

.file-list-item {
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 35px;
  margin-bottom: 15px;
}

.inputBox {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10.8%;
  left: 96%;
}

.inputBox .search {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 43.3px;
  height: 43.3px;
  background: #517bd6;
  border-radius: 50%;
  transition: all 1s;
  z-index: 4;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
}

.inputBox .search:hover {
  cursor: pointer;
}

.inputBox .search::before {
  content: "";
  position: absolute;
  margin: auto;
  top: 11px;
  right: 0;
  bottom: 0;
  left: 12px;
  width: 7px;
  height: 1.5px;
  background: white;
  transform: rotate(45deg);
  transition: all 0.3s;
}

.inputBox .search::after {
  content: "";
  position: absolute;
  margin: auto;
  top: -3px;
  right: 0;
  bottom: 0;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.5s;
}

.inputBox input {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  /* left: 0; */
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  background: #fff;
  color: #777;
  border-radius: 30px;
  box-shadow: 0 0 25px 0 #517bd6, 0 0px 15px 0 rgba(0, 0, 0, 0.5);
  transition: all 1s;
  opacity: 0;
  z-index: 5;
  font-weight: bolder;
}

.inputBox input:hover {
  cursor: pointer;
}

.inputBox input:focus {
  width: 300px;
  padding: 0 80px 0 20px;
  opacity: 1;
  cursor: text;
}

.inputBox input:focus ~ .search {
  right: 0px;
  background: #f60;
  z-index: 6;
}

.inputBox input:focus ~ .search::before {
  top: 0;
  left: 0;
  width: 25px;
}

.inputBox input:focus ~ .search::after {
  top: 0;
  left: 0;
  width: 25px;
  height: 2px;
  border: none;
  background: white;
  border-radius: 0%;
  transform: rotate(-45deg);
}

.inputBox input::placeholder {
  color: #777;
  opacity: 0.8;
}

//卡片
.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
</style>