<template>
  <div class="container">
    <div class="header">
      <div style="margin-right: 40px">
        <el-button round @click="back" icon="el-icon-back"></el-button>
      </div>
      <!-- 没什么必要 -->
      <!-- <div style="margin-right: 40px">
        横向
        <el-switch
          v-model="horizontal"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div style="margin-right: 40px">
        可收起
        <el-switch v-model="collapsable"></el-switch>
      </div>
      <div style="margin-right: 40px">
        禁止编辑
        <el-switch v-model="disaled"></el-switch>
      </div>
      <div style="margin-right: 40px">
        仅拖动当前节点
        <el-switch v-model="onlyOneNode"></el-switch>
      </div>
      <div style="margin-right: 40px">
        拖动节点副本
        <el-switch v-model="cloneNodeDrag"></el-switch>
      </div> -->
      <div style="margin-right: 40px">
        背景色：
        <el-select v-model="style.background" placeholder="请选择">
          <el-option
            v-for="item in options_background"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- <color-picker v-model="style.background" size="small"></color-picker> -->
        &nbsp; 文字颜色：
        <el-select v-model="style.color" placeholder="请选择">
          <el-option
            v-for="item in options_text"
            :key="item.value_text"
            :label="item.label"
            :value="item.value_text"
          >
          </el-option>
        </el-select>
        <!-- <color-picker v-model="style.color" size="small"></color-picker>&nbsp; -->
        &nbsp; 搜索：
        <el-input
          type="text"
          v-model="keyword"
          placeholder="请输入搜索内容"
          @keydown.enter="filter"
          style="width: 200px;"
        ></el-input>
      </div>
    </div>

    <div class="zm-tree-org">
      <zm-tree-org
        ref="tree"
        :data="data"
        :disabled="disaled"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-style="style"
        :node-draggable="true"
        :default-expand-level="1"
        :only-one-node="onlyOneNode"
        :clone-node-drag="cloneNodeDrag"
        :before-drag-end="beforeDragEnd"
        :toolBar="toolBar"
        :filterNodeMethod="filterNodeMethod"
        @on-node-drag="nodeDragMove"
        @on-node-drag-end="nodeDragEnd"
        @on-contextmenu="onMenus"
        @on-expand="onExpand"
        @on-node-click="onNodeClick"
        @on-node-dblclick="onNodeDblclick"
        @on-node-copy="onNodeCopy"
      >
        <!-- <template v-slot="{node}">
            <div class="tree-org-node__text node-label">{{node.label}}</div>
        </template>
        <template v-slot:expand="{node}">
          <div>{{node.children.length}}</div>
        </template> -->
      </zm-tree-org>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toolBar: {
        scale: false,
      },
      keyword: "",
      data: {
        id: 1,
        label: "xxx科技有限公司",
        children: [
          {
            id: 2,
            pid: 1,
            label: "产品研发部",
            style: this.style,
            expand: false,
            children: [
              {
                id: 6,
                pid: 2,
                label: "禁止编辑节点",
                disabled: true,
              },
              {
                id: 7,
                pid: 2,
                label: "研发-后端",
              },
              {
                id: 8,
                pid: 2,
                label: "禁止拖拽节点",
                noDragging: true,
              },
              {
                id: 9,
                pid: 2,
                label: "产品经理",
              },
              {
                id: 10,
                pid: 2,
                label: "测试",
              },
            ],
          },
          {
            id: 3,
            pid: 1,
            label: "客服部",
            children: [
              {
                id: 11,
                pid: 3,
                label: "客服一部",
              },
              {
                id: 12,
                pid: 3,
                label: "客服二部",
              },
            ],
          },
          {
            id: 4,
            pid: 1,
            label: "业务部",
          },
          {
            id: 5,
            pid: 1,
            label: "人力资源中心",
          },
        ],
      },
      horizontal: true,
      collapsable: true,
      onlyOneNode: false,
      cloneNodeDrag: false,
      expandAll: true,
      disaled: false,
      style: {
        background: "#e0ffff",
        color: "#000000",
      },
      options_background: [
        {
          value: "#ffffff",
          label: "白色",
        },
        {
          value: "#e0ffff",
          label: "浅蓝色",
        },
        {
          value: "#ffffe0",
          label: "淡黄色",
        },
        {
          value: "#20b2aa",
          label: "浅绿色",
        },
        {
          value: "#f1bbc0",
          label: "淡粉色",
        },
      ],
      options_text: [
        {
          value_text: "#000000",
          label: "黑色",
        },
        {
          value_text: "#ffffff",
          label: "白色",
        },

        {
          value_text: "#e0ffff",
          label: "浅蓝色",
        },
        {
          value_text: "#20b2aa",
          label: "浅绿色",
        },
        {
          value_text: "#f1bbc0",
          label: "淡粉色",
        },
      ],
    };
  },
  created() {
    this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    back() {
      this.$router.push("/files");
    },
    refresh() {
      console.log(this.value_background, this.value_text);
      console.log(this.style.background, this.style.color);
    },
    onMenus({ node, command }) {
      console.log(node, command);
    },
    filter() {
      this.$refs.tree.filter(this.keyword);
    },
    filterNodeMethod(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    nodeDragMove(data) {
      console.log(data);
    },
    beforeDragEnd(node, targetNode) {
      return new Promise((resolve, reject) => {
        if (!targetNode) reject();
        if (node.id === targetNode.id) {
          reject();
        } else {
          resolve();
        }
      });
    },
    nodeDragEnd(node, parentNode) {
      node.id === parentNode.id && this.$Message.info("移动到自身");
    },
    onNodeClick(e, data) {
      this.$Message.info(data.label);
    },
    onNodeDblclick() {
      this.$Message.info("双击节点");
    },
    onNodeCopy() {
      this.$Message.success("复制成功");
    },
    handleNodeAdd(node) {
      console.log(node);
      this.$Message.info("新增节点");
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          this.$set(item, "expand", val);
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  height: 50px;
  padding: 0 20px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom-style: double;
  border-width: 1px;
  border-color: black;
}

.zm-tree-org {
  height: 100%;
  background-color: #e0ffff;
  flex: 1;
}
</style>