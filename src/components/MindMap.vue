<template>
  <!-- 普通菜单 -->
  <div class="jsmind_layout">
    <!-- 节点编辑 -->
    <el-drawer
      title="节点编辑"
      :visible.sync="dialogVisible"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form label-width="80px" class="form-con">
          <el-form-item label="字体大小">
            <el-input-number
              controls-position="right"
              v-model.number="nodeOption.fontSize"
              class="ele-width"
              :min="1"
              :max="30"
              maxLength="2"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="字体粗细">
            <el-select v-model="nodeOption.fontWeight" class="ele-width">
              <el-option value="normal" label="常规"></el-option>
              <el-option value="bold" label="粗体"></el-option>
              <el-option value="bolder" label="更粗"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体样式">
            <el-select v-model="nodeOption.fontStyle" class="ele-width">
              <el-option value="normal" label="标准"></el-option>
              <el-option value="italic" label="斜体"></el-option>
              <el-option value="oblique" label="倾斜"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="背景颜色">
                <el-color-picker
                  v-model="nodeOption.bgColor"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字体颜色">
                <el-color-picker
                  v-model="nodeOption.fontColor"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="节点内容">
            <el-input
              type="textarea"
              :rows="2"
              v-model="nodeOption.content"
              class="ele-width"
              maxLength="64"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="sureEditNode">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-drawer>

    <!-- 功能键 -->
    <div class="jsmind_toolbar" v-if="showBar">
      <el-button
        @click="goback"
        icon="el-icon-back"
        size="medium"
        circle
      ></el-button>
      <el-button
        @click="screen_shot"
        type="primary"
        icon="el-icon-upload2"
        size="medium"
        >导出</el-button
      >
      <el-button @click="save_nodearray_file" size="medium">保存</el-button>
      <el-button @click="get_nodearray_data" size="medium">获取数据</el-button>
      <el-button @click="addNode" size="medium">新增节点</el-button>
      <el-button @click="addBrotherNode" size="medium">新增兄弟节点</el-button>
      <el-button @click="editNode" size="medium">编辑节点</el-button>
      <el-button @click="removeNode" size="medium">删除节点</el-button>
      <el-button @click="zoomIn" size="medium" :disabled="isZoomIn"
        >放大</el-button
      >
      <el-button
        @click="zoomOut"
        size="medium"
        :disabled="isZoomOut"
        class="pad"
        >缩小</el-button
      >
      <span>展开：</span>
      <el-select
        v-model="level"
        placeholder="展开节点"
        @change="expand_to_level"
        class="pad pad-left"
        size="medium"
      >
        <el-option
          v-for="item in nodeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span>主题：</span>
      <el-select
        v-model="localTheme"
        placeholder="选择主题"
        @change="set_theme"
        size="medium"
      >
        <el-option
          v-for="item in themeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-left: 10px"> 模式：</span>
      <el-select
        v-model="type"
        placeholder="选择结构"
        @change="toggleStucture(type)"
        size="medium"
      >
        <el-option
          v-for="item in modeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <!-- 思维导图界面 -->
    <div id="jsmind_container" ref="container"></div>
  </div>
</template>


<script>
import "jsmind/style/jsmind.css";
import jsMind from "jsmind/js/jsmind.js";
window.jsMind = jsMind;

require("jsmind/js/jsmind.draggable-node.js");
require("jsmind/js/jsmind.screenshot.js");
export default {
  props: {
    showBar: {
      // 是否显示工具栏，显示启用编辑
      type: Boolean,
      default: true,
    },
    theme: {
      // 主题
      type: String,
      default: "info",
    },
    lineColor: {
      // 线条颜色
      type: String,
      default: "skyblue",
    },
  },
  data() {
    return {
      mind: {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        meta: {
          name: "思维导图",
          author: "hizzgdev@163.com",
          version: "0.2",
        },
        /* 数据格式声明 */
        format: "node_tree",
        /* 数据内容 */
        data: {
          id: "root",
          topic: "jsMind",
          children: [
            {
              id: "easy", // [必选] ID, 所有节点的ID不应有重复，否则ID重复的结节将被忽略
              topic: "Easy", // [必选] 节点上显示的内容
              direction: "right", // [可选] 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
              expanded: true, // [可选] 该节点是否是展开状态，默认为 true
              children: [
                { id: "easy1", topic: "Easy to show" },
                { id: "easy2", topic: "Easy to edit" },
                { id: "easy3", topic: "Easy to store" },
                { id: "easy4", topic: "Easy to embed" },
              ],
            },
            {
              id: "open",
              topic: "Open Source",
              direction: "right",
              expanded: true,
              children: [
                { id: "open1", topic: "on GitHub" },
                { id: "open2", topic: "BSD License" },
              ],
            },
            {
              id: "powerful",
              topic: "Powerful",
              direction: "right",
              children: [
                { id: "powerful1", topic: "Base on Javascript" },
                { id: "powerful2", topic: "Base on HTML5" },
                { id: "powerful3", topic: "Depends on you" },
              ],
            },
            {
              id: "other",
              topic: "test node",
              direction: "right",
              children: [
                { id: "other1", topic: "I'm from local variable" },
                { id: "other2", topic: "I can do everything" },
              ],
            },
          ],
        },
      },
      jm: null,
      isZoomIn: false,
      isZoomOut: false,
      level: 0,
      nodeOptions: [
        { value: 1, label: "展开到一级节点" },
        { value: 2, label: "展开到二级节点" },
        { value: 3, label: "展开到三级节点" },
        { value: 0, label: "展开全部节点" },
        { value: -1, label: "隐藏全部节点" },
      ],
      themeOptions: [
        { value: "default", label: "default" },
        { value: "primary", label: "primary" },
        { value: "warning", label: "warning" },
        { value: "danger", label: "danger" },
        { value: "success", label: "success" },
        { value: "info", label: "info" },
        { value: "greensea", label: "greensea" },
        { value: "nephrite", label: "nephrite" },
        { value: "belizehole", label: "belizehole" },
        { value: "wisteria", label: "wisteria" },
        { value: "asphalt", label: "asphalt" },
        { value: "orange", label: "orange" },
        { value: "pumpkin", label: "pumpkin" },
        { value: "pomegranate", label: "pomegranate" },
        { value: "clouds", label: "clouds" },
        { value: "asbestos", label: "asbestos" },
      ],
      localTheme: this.theme,
      dialogVisible: false,
      nodeOption: {
        content: "",
        bgColor: "",
        fontColor: "",
        fontSize: "",
        fontWeight: "",
        fontStyle: "",
      },
      modeOptions: [
        { value: "full", label: "双边" },
        { value: "left", label: "左边" },
        { value: "right", label: "右边" },
      ],
      type: "right",
      options: {
        container: "jsmind_container", // 必选，容器ID
        editable: this.showBar, // 可选，是否启用编辑
        theme: this.localTheme, // 可选，主题
        view: {
          engine: "canvas", // 思维导图各节点之间线条的绘制引擎
          hmargin: 120, // 思维导图距容器外框的最小水平距离
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 2, // 思维导图线条的粗细
          line_color: this.lineColor, // 思维导图线条的颜色
        },
        shortcut: {
          enable: true, // 是否启用快捷键
          handles: {}, // 命名的快捷键事件处理器
          mapping: {
            // 快捷键映射
            addchild: [45, 4096 + 13], // <Insert>, <Ctrl> + <Enter>
            addbrother: 13, // <Enter>
            editnode: 113, // <F2>
            delnode: 46, // <Delete>
            toggle: 32, // <Space>
            left: 37, // <Left>
            up: 38, // <Up>
            right: 39, // <Right>
            down: 40, // <Down>
          },
        },
        layout: {
          hspace: 100, // 节点之间的水平间距
          vspace: 20, // 节点之间的垂直间距
          pspace: 20, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        mode: "full", // 显示模式，子节点只分布在根节点右侧
      },
    };
  },
  created() {},
  mounted() {
    this.jm = jsMind.show(this.options, this.mind);
    // this.getData();
    this.mouseWheel();
    this.mouseDrag();
  },
  methods: {
    // 返回主页
    goback() {
      this.$router.push("/files");
    },
    cancelForm() {
      this.dialogVisible = false;
      clearTimeout(this.timer);
    },
    beforeUpload(file) {
      // 上传文件之前钩子
      if (file) {
        jsMind.util.file.read(file, (jsmindData) => {
          const mind = jsMind.util.json.string2json(jsmindData);
          if (mind) {
            this.jm.show(mind);
            this.$message({ type: "success", message: "打开成功" });
          } else {
            this.prompt_info("不能打开mindmap文件");
          }
        });
      } else {
        this.prompt_info("请先选择文件");
        return false;
      }
    },
    upload() {},
    getData() {
      this.$API({
        name: "getMind",
      })
        .then((res) => {
          this.mind = res.data;
          this.open_empty();
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    open_empty() {
      const options = {
        container: "jsmind_container", // 必选，容器ID
        editable: this.showBar, // 可选，是否启用编辑
        theme: this.localTheme, // 可选，主题
        view: {
          engine: "canvas", // 思维导图各节点之间线条的绘制引擎
          hmargin: 120, // 思维导图距容器外框的最小水平距离
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 2, // 思维导图线条的粗细
          line_color: this.lineColor, // 思维导图线条的颜色
        },
        shortcut: {
          enable: true, // 是否启用快捷键
          handles: {}, // 命名的快捷键事件处理器
          mapping: {
            // 快捷键映射
            addchild: [45, 4096 + 13], // <Insert>, <Ctrl> + <Enter>
            addbrother: 13, // <Enter>
            editnode: 113, // <F2>
            delnode: 46, // <Delete>
            toggle: 32, // <Space>
            left: 37, // <Left>
            up: 38, // <Up>
            right: 39, // <Right>
            down: 40, // <Down>
          },
        },
        layout: {
          hspace: 100, // 节点之间的水平间距
          vspace: 20, // 节点之间的垂直间距
          pspace: 20, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        mode: "full", // 显示模式，子节点只分布在根节点右侧
      };
      this.jm = jsMind.show(options, this.mind);
      // 改变窗口大小重置画布
      window.onresize = () => {
        this.jm.resize();
      };
    },
    save_nodearray_file() {
      const mindData = this.jm.get_data("node_array");
      const mindName = mindData.meta.name;
      const mindStr = jsMind.util.json.json2string(mindData);
      jsMind.util.file.save(mindStr, "text/jsmind", mindName + ".jm");
      console.log(jsMind);
    },
    screen_shot() {
      this.jm.screenshot.shootDownload();
    },
    expand_all() {
      this.jm.expand_all();
    },
    collapse_all() {
      this.jm.collapse_all();
    },
    expand_to_level(num) {
      switch (num) {
        case -1:
          this.collapse_all();
          break;
        case 0:
          this.expand_all();
          break;
        default:
          this.jm.expand_to_depth(num);
          break;
      }
    },
    zoomIn() {
      if (this.jm.view.zoomIn()) {
        this.isZoomOut = false;
      } else {
        this.isZoomIn = true;
      }
    },
    zoomOut() {
      if (this.jm.view.zoomOut()) {
        this.isZoomIn = false;
      } else {
        this.isZoomOut = true;
      }
    },
    prompt_info(msg) {
      this.$message({ type: "warning", message: msg });
    },
    get_nodearray_data() {
      const mindData = this.jm.get_data("node_array");
      const mindString = jsMind.util.json.json2string(mindData);
      this.$message({ type: "info", message: mindString });
    },
    set_theme(themeName) {
      this.jm.set_theme(themeName);
    },
    // 循环树结构
    loopTreeData(list, callback) {
      (function doOneFloor(list) {
        if (Array.isArray(list)) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            callback(item, i);
            if (item.children && item.children.length > 0) {
              doOneFloor(item.children);
            }
          }
        }
      })(list);
    },
    // 切换思维导图结构
    toggleStucture(type) {
      // if (this.jm.options.mode === type) return;
      // this.structure.active = type;
      switch (type) {
        case "full":
          // 两边分布
          this.loopTreeData(this.mind.data.children, (item, i) => {
            item.direction = i % 2 ? "left" : "right";
          });
          break;

        case "left":
          // 向左分布
          this.loopTreeData(this.mind.data.children, (item) => {
            item.direction = "left";
          });
          break;

        case "right":
          // 向右分布
          this.loopTreeData(this.mind.data.children, (item) => {
            item.direction = "right";
          });
          break;

        default:
          break;
      }
      this.jm.show(this.mind);
    },

    scrollFunc(e) {
      e = e || window.event;
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      } else if (e.detail) {
        if (e.detail > 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      }
      this.jm.resize();
    },
    // 鼠标滚轮放大缩小
    mouseWheel() {
      if (document.addEventListener) {
        document.addEventListener("domMouseScroll", this.scrollFunc, false);
      }
      this.$refs.container.onmousewheel = this.scrollFunc;
    },
    // 鼠标拖拽
    mouseDrag() {
      // 里层
      const el = document.querySelector(".jsmind-inner");
      // 选中节点
      let selected;

      el.onmousedown = (ev) => {
        // 选中节点
        selected = this.jm.get_selected_node();
        // 标识 是否拖拽节点 避免冲突
        this.dragNodeFlag = !!selected;

        const disX = ev.clientX;
        const disY = ev.clientY;
        const originalScrollLeft = el.scrollLeft;
        const originalScrollTop = el.scrollTop;
        const originalScrollBehavior = el.style["scroll-behavior"];
        const originalPointerEvents = el.style["pointer-events"];
        // auto: 默认值，表示滚动框立即滚动到指定位置。
        el.style["scroll-behavior"] = "auto";
        // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
        document.onmousemove = (ev) => {
          if (this.dragNodeFlag) return;
          this.drag = false;
          ev.preventDefault();
          // 计算拖拽的偏移距离
          const distanceX = ev.clientX - disX;
          const distanceY = ev.clientY - disY;

          el.scrollTo(
            originalScrollLeft - distanceX,
            originalScrollTop - distanceY
          );

          // 在鼠标拖动的时候将点击事件屏蔽掉
          el.style["pointer-events"] = "none";
          el.style.cursor = "grabbing";
        };
        document.onmouseup = () => {
          if (!this.dragNodeFlag) {
            el.style["scroll-behavior"] = originalScrollBehavior;
            el.style["pointer-events"] = originalPointerEvents;
            el.style.cursor = "grab";
          }
          document.onmousemove = document.onmouseup = null;
        };
      };
    },

    // 新增节点
    addNode() {
      let selectedNode = this.jm.get_selected_node();
      if (!selectedNode) {
        this.$message({ type: "warning", message: "请先选择一个节点!" });
        return;
      }
      let nodeid = jsMind.util.uuid.newid();
      let topic = "new Node";
      let newNode = this.jm.add_node(selectedNode, nodeid, topic);
      if (newNode) {
        this.jm.select_node(nodeid);
        this.jm.begin_edit(nodeid);
      }
    },
    // 新增兄弟节点
    addBrotherNode() {
      let selectedNode = this.jm.get_selected_node();
      if (!selectedNode) {
        this.$message({ type: "warning", message: "请先选择一个节点!" });
        return;
      } else if (selectedNode.isroot) {
        this.$message({
          type: "warning",
          message: "不能在根节点添加，请重新选择节点!",
        });
        return;
      }
      let nodeid = jsMind.util.uuid.newid();
      let topic = "new Node";
      let newNode = this.jm.insert_node_after(selectedNode, nodeid, topic);
      if (newNode) {
        this.jm.select_node(nodeid);
        this.jm.begin_edit(nodeid);
      }
    },
    // 获取选中标签的 ID
    get_selected_nodeid() {
      let selectedNode = this.jm.get_selected_node();
      if (selectedNode) {
        return selectedNode.id;
      } else {
        return null;
      }
    },
    // 删除节点
    removeNode() {
      let selectedId = this.get_selected_nodeid();
      if (!selectedId) {
        this.$message({
          type: "warning",
          message: "请先选择一个节点!",
        });
        return;
      }
      this.jm.remove_node(selectedId);
    },
    // 编辑节点
    editNode() {
      let selectedId = this.get_selected_nodeid();
      if (!selectedId) {
        this.$message({ type: "warning", message: "请先选择一个节点!" });
        return;
      }
      let nodeObj = this.jm.get_node(selectedId);
      this.nodeOption.content = nodeObj.topic;
      this.nodeOption.bgColor = nodeObj.data["background-color"];
      this.nodeOption.fontColor = nodeObj.data["foreground-color"];
      this.nodeOption.fontSize = nodeObj.data["font-size"];
      this.nodeOption.fontWeight = nodeObj.data["font-weight"];
      this.nodeOption.fontStyle = nodeObj.data["font-style"];
      this.dialogVisible = true;
    },
    sureEditNode() {
      let selectedId = this.get_selected_nodeid();
      this.jm.update_node(selectedId, this.nodeOption.content);
      this.jm.set_node_font_style(
        selectedId,
        this.nodeOption.fontSize,
        this.nodeOption.fontWeight,
        this.nodeOption.fontStyle
      );
      this.jm.set_node_color(
        selectedId,
        this.nodeOption.bgColor,
        this.nodeOption.fontColor
      );
      this.nodeOption = {
        content: "",
        bgColor: "",
        fontColor: "",
        fontSize: "",
        fontWeight: "",
        fontStyle: "",
      };
      this.dialogVisible = false;
    },
  },
  beforeDestroy() {
    document.removeEventListener("domMouseScroll", this.scrollFunc, false);
  },
};
</script>

<style lang="less" scoped>
.demo-drawer__footer {
  display: flex;
  justify-content: space-around;
}

.jsmind_layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;

  .jsmind_toolbar {
    width: 100%;
    padding: 0 10px 10px 10px;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: #f8f9fa;
    box-shadow: 0 0 4px #b8b8b8;
  }

  /deep/ .el-button--medium,
  /deep/ .el-input--medium {
    margin-top: 10px;
  }

  #jsmind_container {
    flex: 1 1 auto;
  }

  /deep/.jsmind-inner {
    overflow: hidden auto !important;
  }

  /deep/.el-upload-list {
    display: none !important;
  }

  /* 隐藏滚动条 */
  .jsmind-inner::-webkit-scrollbar {
    display: none;
  }

  .pad {
    margin-right: 10px;
  }

  .pad-left {
    margin-left: 10px;
  }

  /deep/ jmnode.selected {
    background-color: #b9b9b9;
    color: #fff;
    box-shadow: 2px 2px 8px #777;
  }

  /deep/ jmnode:hover {
    box-shadow: 2px 2px 8px #777;
  }

  .form-con {
    padding-top: 20px;
  }

  .ele-width {
    width: 96%;
  }
}
</style>