<template>
  <el-table :data="tableData" style="width: 100%; margin: 20px 0px" border>
    <el-table-column prop="noticeTitle" label="标题" sortable />
    <el-table-column prop="noticeCreateTime" label="创建时间" sortable>
      <template #default="scope">
        {{ scope.row.noticeCreateTime | parseTime }}
      </template>
    </el-table-column>
    <el-table-column prop="noticeOrder" label="Order" sortable />
    <el-table-column prop="noticeStatus" label="状态" sortable>
      <template #default="scope">
        {{ scope.row.noticeStatus | statusFormat }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          class="btn"
          type="primary"
          @click="edit(scope.row)"
          >编辑</el-button
        >
        <el-button size="mini" class="btn" type="danger" @click="del(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="noticeId" label="ID" sortable />
  </el-table>
</template>
<script>
import { getNoticeList, delNotice } from "@/03-api/notice";
import { NoticeStatusEnum } from "@/02-utils/enum";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  methods: {
    edit(row) {
      this.$router.push({
        path: "/notice/Update",
        query: { noticeId: row.noticeId },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.noticeTitle}吗`, "提示").then(
        async () => {
          const { code } = await delNotice({ id: row.noticeId });
          if (code == 0) {
            this.$message.success("删除成功");
            this.loadNotice();
          }
        }
      );
    },
    async loadNotice() {
      const list = await getNoticeList();
      this.tableData = list;
    },
  },
  filters: {
    statusFormat(s) {
      const notice = NoticeStatusEnum.find((v) => v.val == s);
      console.log("===notice===", notice);
      return notice ? notice.name : "N/A";
    },
  },
  created() {
    this.loadNotice();
  },
};
</script>
<style lang="scss" scoped>
.notice {
  margin-top: 20px;
  .devide {
    margin: 20px 0;
  }
}
</style>