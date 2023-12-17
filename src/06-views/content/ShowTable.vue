<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column
        prop="Title"
        label="标题图"
        min-width="100"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-image class="img" :src="scope.row.ImgUrl"></el-image>
          <!-- <div class="title">
            <el-image class="img" :src="scope.row.ImgUrl"></el-image>
            <div class="text">
              <h4 class="h4">{{ scope.row.Title }}</h4>
              <time class="time">{{ scope.row.AddTime }}</time>
            </div> 
          </div>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="Title"
        label="标题"
        min-width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="CategoryTitle"
        label="所属类别"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="SortId" label="排序" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Click" label="浏览量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Status" label="状态">
        <template #default="scope">
          <el-button :type="scope.row.Status == 1 ? 'success' : 'danger'">{{
            scope.row.Status | statusFormat
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="发布时间" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="address" label="操作" min-width="50">
        <template #default="scope">
          <!-- <el-button
            size="mini"
            icon="el-icon-document-copy"
            @click="copy(scope.row)"
          ></el-button> -->
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <!-- <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="del(scope.row)"
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ArticleStatusEnum } from "@/02-utils/enum";
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      ArticleStatusEnum: ArticleStatusEnum,
    };
  },
  computed: {},
  created() {},
  methods: {
    copy(row) {},
    edit(row) {
      this.$router.push({
        path: "/content/update",
        query: { isAdd: true, Id: row.Id },
      });
    },
    del(row) {},
    handleSelectionChange(val) {},
  },
  filters: {
    statusFormat(s) {
      let obj = ArticleStatusEnum.find((v) => v.val == s);
      return obj ? obj.name : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  height: 50px;
  margin-right: 5px;
}
</style>
