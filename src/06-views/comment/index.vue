<template>
  <div>
    <el-table :data="tableData" style="width: 100%; margin: 20px 0px" border>
      <el-table-column prop="commentAuthorName" label="作者" sortable />
      <el-table-column prop="commentContent" label="评论内容" sortable />
      <el-table-column prop="article" label="回复至" sortable>
        <template #default="scope">
          {{ scope.row.article.articleTitle }}
        </template>
      </el-table-column>
      <el-table-column prop="commentCreateTime" label="提交于" sortable>
        <template #default="scope">
          {{ scope.row.commentCreateTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column prop="commentId" label="ID" sortable />
    </el-table>
    <div class="page">
      <Pagination
        :total="total"
        :page="params.pageIndex"
        :limit="params.pageSize"
        @pagination="pageChange"
      />
    </div>
  </div>
</template>
<script>
import { getCommentPage } from "@/03-api/comment";
import { CommentStatusEnum } from "@/02-utils/enum";
import Pagination from "@/01-components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: 8,
      },
      tableData: [],
      total: 0,
    };
  },

  methods: {
    async loadComment() {
      let data = {
        pageIndex: this.params.pageIndex,
        pageSize: this.params.pageSize,
      };
      const resData = await getCommentPage(data);
      this.tableData = resData.records;
      this.total = resData.total;
    },
    pageChange(page) {
      this.params.pageIndex = page.page;
      this.params.pageSize = page.limit;
      this.loadComment();
    },
  },
  filters: {
    statusFormat(s) {
      const comment = CommentStatusEnum.find((v) => v.val == s);
      console.log("===comment===", comment);
      return comment ? comment.name : "N/A";
    },
  },
  created() {
    this.loadComment();
  },
};
</script>
<style lang="scss" scoped>
.comment {
  margin-top: 20px;
  .devide {
    margin: 20px 0;
  }
}
</style>