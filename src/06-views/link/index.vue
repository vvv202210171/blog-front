<template>
  <el-table :data="tableData" style="width: 100%; margin: 20px 0px" border>
    <el-table-column prop="linkName" label="名称" sortable />
    <el-table-column
      prop="linkUrl"
      label="URL"
      sortable
      show-overflow-tooltip
    />
    <el-table-column prop="linkOwnerContact" label="联系方式" sortable />
    <el-table-column prop="linkCreateTime" label="创建时间" sortable>
      <template #default="scope">
        {{ scope.row.linkCreateTime | parseTime }}
      </template>
    </el-table-column>
    <el-table-column prop="linkOrder" label="Order" sortable />
    <el-table-column prop="linkStatus" label="状态" sortable>
      <template #default="scope">
        {{ scope.row.linkStatus | statusFormat }}
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
    <el-table-column prop="linkId" label="ID" sortable />
  </el-table>
</template>
<script>
import { getLinkList, delLink } from "@/03-api/link";
import { LinkStatusEnum } from "@/02-utils/enum";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  methods: {
    edit(row) {
      this.$router.push({
        path: "/link/Update",
        query: { linkId: row.linkId },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.linkTitle}吗`, "提示").then(async () => {
        const { code } = await delLink({ id: row.linkId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.loadLink();
        }
      });
    },
    async loadLink() {
      const list = await getLinkList();
      this.tableData = list;
    },
  },
  filters: {
    statusFormat(s) {
      const link = LinkStatusEnum.find((v) => v.val == s);
      console.log("===link===", link);
      return link ? link.name : "N/A";
    },
  },
  created() {
    this.loadLink();
  },
};
</script>
<style lang="scss" scoped>
.link {
  margin-top: 20px;
  .devide {
    margin: 20px 0;
  }
}
</style>