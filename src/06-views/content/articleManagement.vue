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
              v-model="params.Title"
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
            <!-- <el-button
              size="medium"
              icon="el-icon-document"
              @click="showTableStyle = !showTableStyle"
            ></el-button> -->
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
          <el-form-item label="筛选类别">
            <SelectTree
              :treeData="cates"
              v-model="params.categoryId"
              @change="changeCate"
            />
          </el-form-item>
        </div>

        <div class="list-m">
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
      <ShowTable :tableData="list" :loading="loading"></ShowTable>
    </div>
    <div class="list-container" v-else>
      <ShowList></ShowList>
    </div>
    <div class="page">
      <Pagination
        :total="total"
        :page="params.pageNumber"
        :limit="params.pageSize"
        @pagination="pageChange"
      />
    </div>
  </div>
</template>

<script>
// /rp_api/article/article_list   查询文章列表
// 参数： long categoryId, long Id, DateTime
//addTimeFrom, DateTime addTimeTo, int pageNumber , int pageSize
// 返回： new object[] { list (List<Article>), totalCount --总数 }

// /rp_api/article/article_get   查询单条文章
// 参数：long Id
// 返回：Article
import ShowTable from "./ShowTable.vue";
import ShowList from "./ShowList.vue";
import { getArticleList, getArticleTypeList } from "@/03-api/article";
import Pagination from "@/01-components/Pagination";
import SelectTree from "@/01-components/SelectTree";
import dayjs from "dayjs";
const format = "YYYY-MM-DD HH:mm:ss";

export default {
  components: { ShowTable, ShowList, Pagination, SelectTree },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      showTableStyle: true,
      isExpand: false,
      cates: [],
      publishDate: [
        dayjs().subtract(7, "day").format(format),
        dayjs().format(format),
      ],
      params: {
        Id: "",
        Title: "",
        pageNumber: 1,
        pageSize: 20,
        categoryId: [-1],
      },

      submiting: false,
      showAdd: false,
    };
  },
  computed: {},
  created() {
    this.loadList();
    this.loadArticleTypeList();
  },
  methods: {
    async loadArticleTypeList() {
      const data = await getArticleTypeList();
      data.unshift({ Depth: 1, Id: -1, ParentId: 0, Title: "全部" });
      this.cates = this.buildTree(data);
      this.params.categoryId = [-1];
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
      this.params.pageNumber = page.limit;
      this.params.pageSize = page.size;
      this.loadList();
    },
    changeCate(v) {
      this.params.categoryId = v;
    },
    query() {
      this.params.pageNumber = 1;
      this.loadList();
    },
    async loadList() {
      let cateLen = this.params.categoryId.length;
      let dateLen = this.publishDate ? this.publishDate.length : 0;
      let cateId = 0;
      if (cateLen > 0 && this.params.categoryId[cateLen - 1] != -1) {
        cateId = this.params.categoryId[cateLen - 1];
      }
      let data = {
        pageNumber: this.params.pageNumber,
        pageSize: this.params.pageSize,
        categoryId: cateId,
        Id: this.params.Id ? this.params.Id : 0,
        Title: this.params.Title,
        addTimeFrom:
          dateLen == 2
            ? dayjs(this.publishDate[0]).format(format)
            : dayjs().subtract(7, "day").format(format),
        addTimeTo:
          dateLen == 2
            ? dayjs(this.publishDate[1]).format(format)
            : dayjs().format(format),
      };
      try {
        this.loading = true;
        const resData = await getArticleList(data);
        this.list = resData[0];
        this.total = resData[1];
      } finally {
        this.loading = false;
      }
    },
    add() {
      this.$router.push({ path: "/content/add", query: { isAdd: true } });
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
