<template>
  <div class="app-container">
    <el-form size="medium" :inline="true">
      <div class="list">
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
          <!-- <el-form-item label="标题">
            <el-input
              placeholder="请输入标题"
              v-model="params.Title"
              @change="loadList"
              class="input-with-select"
              size="medium"
            >
            </el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button
              size="medium"
              icon="el-icon-search"
              type="primary"
              @click="loadList"
              >查询</el-button
            >
            <el-button size="medium" icon="el-icon-plus" @click="add"
              >新增广告</el-button
            >
          </el-form-item>
        </div>
      </div>
      
    </el-form>
    <div class="table-container" v-if="showTableStyle">
      <ShowTable :tableData="list" :loading="loading"></ShowTable>
    </div>
    <!-- <div class="list-container" v-else>
      <ShowList></ShowList>
    </div> -->
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
import ShowTable from "./advertisingShowTable.vue";
import ShowList from "./advertisingShowList.vue";
import { getAdvertiseList, getArticleTypeList } from "@/03-api/article";
import SelectTree from "@/01-components/SelectTree";

export default {
  components: { ShowTable, ShowList, SelectTree },
  data() {
    return {
      list: [],
      loading: false,
      showTableStyle: true,
      isExpand: false,
      cates: [],
      params: {
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
    
    changeCate(v) {
      this.params.categoryId = v;
      this.loadList();
    },
    async loadList() {
      let cateLen = this.params.categoryId.length;
      
      let cateId = 0;
      if (cateLen > 0 && this.params.categoryId[cateLen - 1] != -1) {
        cateId = this.params.categoryId[cateLen - 1];
      }
      let data = {
        categoryId: cateId,
        
      };
      try {
        this.loading = true;
        const resData = await getAdvertiseList(data);
        this.list = resData;
      } finally {
        this.loading = false;
      }
    },
    add() {
      this.$router.push({ path: "/content/advertisingManagementAdd", query: { isAdd: true } });
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
