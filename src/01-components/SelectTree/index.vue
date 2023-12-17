<template>
  <el-cascader
    v-model="selectedNodes"
    :options="treeData"
    :props="cascaderProps"
    placeholder="请选择"
    @change="handleNodeChange"
  ></el-cascader>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    cascaderProps: {
      type: Object,
      default() {
        return {
          value: "Id", // 对应节点的值的属性名
          label: "Title", // 对应节点的显示文本的属性名
          children: "children", // 对应节点的子节点的属性名
        };
      },
    },
  },
  data() {
    return {
      selectedNodes: [], // 选择的节点值
    };
  },
  methods: {
    handleNodeChange(value) {
      this.$emit("change", value);
    },
  },
  mounted() {
    this.selectedNodes = this.value;
  },
  watch: {
    value(newVal) {
      this.selectedNodes = newVal;
    },
    selectedNodes(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
