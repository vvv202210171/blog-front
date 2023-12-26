<template>
  <el-row :gutter="20" class="page">
    <el-col :span="24">
      <el-divider content-position="left"
        ><h5 style="font-size: 20px">页面列表</h5></el-divider
      >
      <el-table :data="table1" style="width: 100%; margin-bottom: 20px" border>
        <el-table-column prop="pageId" label="ID" sortable />
        <el-table-column prop="pageKey" label="Key" sortable />
        <el-table-column prop="pageTitle" label="标题" sortable />
        <el-table-column
          prop="pageContent"
          label="内容"
          show-overflow-tooltip
          sortable
        >
          <template #default="scope">
            {{ scope.row.pageContent }}
          </template>
        </el-table-column>
        <el-table-column prop="pageStatus" label="状态" sortable>
          <template #default="scope">
            {{ scope.row.pageStatus | statusFormat }}
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
            <el-button
              size="mini"
              class="btn"
              type="danger"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" class="devide">
      <el-divider content-position="left"
        ><h5 style="font-size: 20px">自定义页面</h5></el-divider
      >
    </el-col>
    <el-col :span="12" class="table2">
      <el-table :data="table2" style="width: 100%; margin-bottom: 20px" border>
        <el-table-column prop="pageKey" label="别名" sortable />
        <el-table-column prop="pageTitle" label="标题" sortable />
        <el-table-column label="内容">
          <template #default="scope">
            <el-link type="primary" :href="scope.row.pageUrl">点击查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="6">
      <el-card shadow="never" class="card">
        <h5>温馨提示：</h5>
        <p>1、自定义的页面，无法删除，别名已写入控制器</p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getPageList, delPage } from "@/03-api/page";
import { PageStatusEnum } from "@/02-utils/enum";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    table1() {
      return this.tableData.filter((v) => v.pageStatus == 1);
    },
    table2() {
      return this.tableData.filter((v) => v.pageStatus == 2);
    },
  },
  methods: {
    edit(row) {
      this.$router.push({
        path: "/page/Update",
        query: { pageId: row.pageId },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.pageTitle}吗`, "提示").then(async () => {
        const { code } = await delPage({ id: row.pageId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.loadPage();
        }
      });
    },
    async loadPage() {
      const list = await getPageList();
      this.tableData = list;
    },
  },
  filters: {
    statusFormat(s) {
      const page = PageStatusEnum.find((v) => v.val == s);
      console.log("===page===", page);
      return page ? page.name : "N/A";
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.page {
  margin-top: 20px;
  .devide {
    margin: 20px 0;
  }
}
</style>