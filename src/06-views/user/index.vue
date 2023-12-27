<template>
  <div class="app-container">
    <el-form size="medium" :inline="true">
      <div class="list">
        <div class="list-l">
          <el-form-item label="用户ID">
            <el-input
              placeholder="请输入用户id"
              v-model="params.userId"
              @change="query"
              class="input-with-select"
              size="medium"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="list-m">
          <el-form-item label="用户名">
            <el-input
              placeholder="请输入用户名"
              v-model="params.userName"
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
              >新增用户</el-button
            >
          </el-form-item>
        </div>
        <div class="list-r">
          <el-button-group>
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
          <el-form-item label="创建日期">
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
    <div class="table">
      <el-table :data="tableData" style="width: 100%; margin: 20px 0px" border>
        <el-table-column prop="userName" label="用户名" sortable>
          <template #default="scope">
            <div class="title">
              <el-image class="img" :src="scope.row.userAvatar" />
              <h4 class="h4">{{ scope.row.userName }}</h4>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="userNickname" label="昵称" sortable />
        <el-table-column prop="userEmail" label="电子邮件" sortable />
        <el-table-column prop="articleCount" label="文章" sortable />
        <el-table-column prop="user" label="状态" sortable>
          <template #default="scope">
            {{ scope.row.userStatus | statusFormat }}
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
        <el-table-column prop="userId" label="ID" sortable />
      </el-table>
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
import { getUserPageList, deleteUser } from "@/03-api/user";
import Pagination from "@/01-components/Pagination";
import { UserStatusEnum } from "@/02-utils/enum";
import dayjs from "dayjs";
const format = "YYYY-MM-DD HH:mm:ss";

export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: false,
      isExpand: false,
      publishDate: [],
      params: {
        userId: "",
        userName: "",
        pageIndex: 1,
        pageSize: 8,
      },
    };
  },

  created() {
    this.loadList();
  },
  filters: {
    statusFormat(s) {
      return UserStatusEnum.find((v) => v.val == s).name;
    },
  },
  methods: {
    edit(row) {
      this.$router.push({
        path: "/user/Update",
        query: { isAdd: true, userId: row.userId },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.userName}吗`, "提示").then(async () => {
        const { code } = await deleteUser({ id: row.userId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.loadList();
        }
      });
    },
    pageChange(page) {
      this.params.pageIndex = page.page;
      this.params.pageSize = page.limit;
      this.loadList();
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
        userId: this.params.userId ? this.params.userId : 0,
        userName: this.params.userName,
        startTime:
          dateLen == 2 ? dayjs(this.publishDate[0]).format(format) : null,
        endTime:
          dateLen == 2 ? dayjs(this.publishDate[1]).format(format) : null,
      };
      try {
        this.loading = true;
        const resData = await getUserPageList(data);
        this.tableData = resData.records;
        this.total = resData.total;
      } finally {
        this.loading = false;
      }
    },
    add() {
      this.$router.push({ path: "/user/Add", query: { isAdd: true } });
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
.table {
  .title {
    display: flex;
    align-items: center;
    .img {
      width: 50px;
      height: 50px;
      margin-right: 5px;
    }
    .h4 {
      color: #5da5d4;
    }
  }
}
.page {
  display: flex;
  justify-content: center;
}
</style>
