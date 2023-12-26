<template>
  <div class="app-container">
    <el-form size="medium" :inline="true">
      <div class="list">
        <div class="list-l">
          <!-- <el-button-group>
            <el-button size="medium" icon="el-icon-plus" @click="add"
              >新增</el-button
            >
            <el-button size="medium" icon="el-icon-s-check">审核</el-button>
            <el-button size="medium" icon="el-icon-circle-check"
              >全选</el-button
            >
            <el-button size="medium" icon="el-icon-delete">删除</el-button>
          </el-button-group> -->
          <el-form-item label="文章ID">
            <el-input
              placeholder="请输入id"
              v-model="params.Id"
              @change="query"
              class="input-with-select"
              size="medium"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="list-m">
          <el-form-item label="标题">
            <el-input
              placeholder="请输入标题"
              v-model="params.articleTitle"
              @change="query"
              class="input-with-select"
              size="medium"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="medium"
              icon="el-icon-search"
              type="primary"
              @click="query"
              >查询</el-button
            >
            <el-button size="medium" icon="el-icon-plus" @click="add"
              >新增文章</el-button
            >
          </el-form-item>
        </div>
        <div class="list-r">
          <el-button-group>
            <el-button
              size="medium"
              icon="el-icon-document"
              @click="showTableStyle = !showTableStyle"
            ></el-button>
            <el-button
              size="medium"
              :icon="isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              @click="isExpand = !isExpand"
            ></el-button>
          </el-button-group>
        </div>
      </div>
      <div class="list" v-if="isExpand">
        <div class="list-l">
          <el-form-item label="发布日期">
            <el-date-picker
              v-model="publishDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="query"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="table-container" v-if="showTableStyle">
      <ShowTable
        :tableData="list"
        :loading="loading"
        @toEdit="toEdit"
        @toDel="del"
      ></ShowTable>
    </div>
    <div class="list-container" v-else>
      <ShowList :tableData="list" @toEdit="toEdit" @toDel="del"></ShowList>
    </div>
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
import ShowTable from "./ShowTable.vue";
import ShowList from "./ShowList.vue";
import { getArticleList, deleteArticle } from "@/03-api/article";
import Pagination from "@/01-components/Pagination";
import dayjs from "dayjs";
const format = "YYYY-MM-DD HH:mm:ss";

export default {
  components: { ShowTable, ShowList, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      showTableStyle: true,
      isExpand: false,
      cates: [],
      publishDate: [],
      params: {
        Id: "",
        articleTitle: "",
        pageIndex: 1,
        pageSize: 8,
      },

      submiting: false,
      showAdd: false,
    };
  },

  created() {
    this.loadList();
  },
  methods: {
    toEdit(row) {
      this.$router.push({
        path: "/article/Update",
        query: { isAdd: true, articleId: row.articleId },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.articleTitle}吗`, "提示").then(
        async () => {
          const { code } = await deleteArticle({ id: row.articleId });
          if (code == 0) {
            this.$message.success("删除成功");
            this.loadList();
          }
        }
      );
    },
    buildTree(data) {
      const tree = [];
      const map = {};
      data.forEach((item) => {
        map[item.Id] = { ...item };
      });
      data.forEach((item) => {
        if (item.ParentId === 0) {
          tree.push(map[item.Id]);
        } else {
          if (!Object.hasOwnProperty(map[item.ParentId], "children")) {
            map[item.ParentId].children = [];
          }
          map[item.ParentId].children.push(map[item.Id]);
        }
      });
      return tree;
    },
    pageChange(page) {
      console.log(page);
      this.params.pageIndex = page.page;
      this.params.pageSize = page.limit;
      this.loadList();
    },
    changeCate(v) {
      this.params.categoryId = v;
    },
    query() {
      this.params.pageIndex = 1;
      this.loadList();
    },
    async loadList() {
      let dateLen = this.publishDate ? this.publishDate.length : 0;

      let data = {
        pageIndex: this.params.pageIndex,
        pageSize: this.params.pageSize,
        articleId: this.params.Id ? this.params.Id : 0,
        articleTitle: this.params.articleTitle,
        startTime:
          dateLen == 2 ? dayjs(this.publishDate[0]).format(format) : null,
        endTime:
          dateLen == 2 ? dayjs(this.publishDate[1]).format(format) : null,
      };
      try {
        this.loading = true;
        const resData = await getArticleList(data);
        this.list = resData.records;
        this.total = resData.total;
      } finally {
        this.loading = false;
      }
    },
    add() {
      this.$router.push({ path: "/article/Add", query: { isAdd: true } });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  margin-bottom: 20px;
  .list-l {
    min-width: 300px;
  }
  .input-with-select {
    margin-right: 15px;
    min-width: 197px;
  }
  .list-m {
    min-width: 96px;
    max-width: 612px;
    flex-grow: 1;
    flex-basis: 0;
    margin: 0 20px;
    display: flex;

    .list-m-form {
      margin: 0 auto;
    }
  }
}
.page {
  display: flex;
  justify-content: center;
}
</style>
