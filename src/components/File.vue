<template>
  <div>

    <div class="dir">
      <span id="dir_root">我的文件</span>
    </div>

    <div class="search-container">

      <div class="inputBox">
        <input type="text" placeholder="输入文件名称" v-model="keywords" @keydown.enter="search" @keyup="getData($event)"
          @blur="hiddenData">
        <div class="search"></div>
      </div>

      <span id="btn"><el-button type="success" icon="el-icon-upload" circle @click="gotolink"></el-button></span>

      <el-dialog title="上传本地文件" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="请选择文件" label-width="100px">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
              :on-exceed="handleExceed" :file-list="fileList2">
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

    </div>

    <div>
      <span id="ss">搜索记录:
        ​ <span class="search-history" v-for="(item, index) in searchHistory" @click="ressetSearch(item)">
          ​ {{ item }} &nbsp;
          ​ </span>
        ​ <!--  实时的搜索数据显示列表-->
        <ul class="show_data" v-show="isShow">
          <li v-for="(item, index) in data" v-bind:key="index">{{ item }}</li>
        </ul>
        ​ <!-- 当点击搜索按钮，和按下回车键的时候 ，会把搜索出来的与input框中的字一致的数据展示出来 -->
        <ul>
          <li v-for="(item, index) in result" v-bind:key="index">{{ item }}</li>
        </ul>
      </span>
    </div>

    <div class="file-list">
      <div class="file-list-item" v-for="fileListItem in fileList" :key="fileListItem.id" @click="openfile">
        <div class="file-img-container">
          <img :src="fileListItem.imgsrc" alt="" />
        </div>
        <div class="file-name">
          <span>
            <i class="el-icon-share"></i>
            <label>{{ fileListItem.themename }}</label>
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
          themename: "电磁场",
        },
        {
          id: "2",
          imgsrc: require("../assets/file_img.png"),
          themename: "通信电子线路",
        },
        {
          id: "3",
          imgsrc: require("../assets/file_img.png"),
          themename: "通信原理",
        },
        {
          id: "4",
          imgsrc: require("../assets/file_img.png"),
          themename: "计算机网络技术",
        },
        {
          id: "5",
          imgsrc: require("../assets/file_img.png"),
          themename: "数字信号处理",
        },
        {
          id: "6",
          imgsrc: require("../assets/file_img.png"),
          themename: "软件课设",
        },
        {
          id: "7",
          imgsrc: require("../assets/file_img.png"),
          themename: "JAVA",
        },
      ],

      goodsList: ["电磁场", "通信电子线路", "通信原理", "计算机网络技术", "数字信号处理", "软件课设", "JAVA"], //所有的数据
      keywords: '', //input框绑定的关键字
      result: [], //搜索结果，是一个数组
      data: [], //实时的搜索的数据
      isShow: false, //判断实时的数据是否要显示  默认是不显示
      searchHistory: [], //搜索记录

      dialogFormVisible: false,

      fileList2: [{ name: 'mindmap.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      { name: 'mindmap2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
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
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    goback() {
      this.$router.replace('/files');
    },
    openfile() {
      this.$router.push("/mindmap");
    },
    gotolink() {
      // this.$router.replace('/upload');
      this.dialogFormVisible = true;
    },
    search() {
      // 每次搜索前 把之前的数据清空
      this.result = [];
      // 每次输入的时候，让他显示出来
      this.isShow = true;
      // 遍历拿到item，并判断值是否和input框相似，一样就添加到result数组中
      this.goodsList.map((item, index) => {
        if (item.includes(this.keywords)) {
          this.result.push(item);
        }
      });
      // 存数据之前  如果历史记录中有的话，就不让添加  ！取反
      if (!this.searchHistory.includes(this.keywords)) {
        // 搜索记录会添加那些的input框的关键字
        this.searchHistory.push(this.keywords);
      }
    },
    // 实时的搜索的数据  根据传的参数，拿到event的对象
    getData(event) {
      // 监听event的事件  当键盘码是13的话，就让实时的列表隐藏
      if (event.keyCode == 13) {
        this.isShow = false;
        return; //方法结束，不执行
      }
      // 每次搜索前 把之前的数据清空
      this.data = [];
      // 当他按下回车的时候也没有，即，不会显示实时更新的一部分
      this.isShow = true;
      this.goodsList.map((item, index) => {
        if (item.includes(this.keywords)) {
          this.data.push(item);
        }
      })
    },
    // 当他失去焦点的时候，会隐藏实时的列表
    hiddenData() {
      this.isShow = false;
    },
    // kw就是传过来的值item，意思就是点击历史记录的词，会重新返回到input输入框
    ressetSearch(kw) {
      this.keywords = kw;
    },
    goback() {
      this.$router.replace('/files');
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

.inputBox {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 15.5%;
  left: 92%;
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
  transition: all .3s;
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
  transition: all .5s;
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

.inputBox input:focus~.search {
  right: 0px;
  background: #f60;
  z-index: 6;
}

.inputBox input:focus~.search::before {
  top: 0;
  left: 0;
  width: 25px;
}

.inputBox input:focus~.search::after {
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
</style>