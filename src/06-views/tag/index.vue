<template>
  <el-row :gutter="20" class="cate">
    <el-col :span="8">
      <el-card class="card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="header"> {{ isAdd ? "添加分类" : "修改分类" }}</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="midum"
        >
          <el-form-item label="名称" prop="tagName">
            <el-input v-model="ruleForm.tagName"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" prop="tagDescription">
            <el-input v-model="ruleForm.tagDescription"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{
              isAdd ? "添加" : "修改"
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="never" class="card">
        <h5>温馨提示：</h5>
        <p>标签名必选，建议不要太长</p>
        <p>标签名勿重复</p>
      </el-card>
    </el-col>

    <el-col :span="16" class="table">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="tagId"
        border
      >
        <el-table-column prop="tagName" label="名称" sortable width="180">
        </el-table-column>
        <el-table-column
          prop="articleCount"
          label="文章数"
          sortable
          width="180"
        >
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
              v-if="scope.row.articleCount == 0"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="tagId" label="ID"> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import {
  getArticleTagListCount,
  addArticleTag,
  updateArticleTag,
  deleteArticleTag,
} from "@/03-api/article";
const _form = {
  tagName: "",
  categoryPid: 0,
  tagDescription: "",
  tagId: null,
};
export default {
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(_form)),
      isAdd: true,
      rules: {
        tagName: [
          { required: true, message: "请输入称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
      },
      tableData: [],
    };
  },
  computed: {},
  methods: {
    edit(row) {
      Object.keys(this.ruleForm).forEach((k) => {
        this.ruleForm[k] = row[k];
      });
      this.isAdd = false;
    },
    del(row) {
      this.$confirm(`您确定要删除${row.tagName}吗`, "提示").then(async () => {
        const { code } = await deleteArticleTag({ id: row.tagId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.loadCateList();
        }
      });
    },
    async addSubmit() {
      const { code } = await addArticleTag(this.ruleForm);
      if (code == 0) {
        this.$message.success("添加成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.loadCateList();
      }
    },
    async updateSubmit() {
      const { code } = await updateArticleTag(this.ruleForm);
      if (code == 0) {
        this.$message.success("修改成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.loadCateList();
        this.isAdd = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        if (this.isAdd) {
          this.addSubmit();
        } else {
          this.updateSubmit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async loadCateList() {
      const list = await getArticleTagListCount();
      this.tableData = list;
    },
  },
  created() {
    this.loadCateList();
  },
};
</script>
<style lang="scss" scoped>
.cate {
  margin-top: 20px;
  .el-card__header {
    border-bottom: none;
  }
  .table {
    .btn {
      padding: 4px 7px;
    }
  }
  .card {
    margin-left: 20px;
    margin-bottom: 20px;
    .header {
      font-weight: bolder;
    }
  }
}
</style>