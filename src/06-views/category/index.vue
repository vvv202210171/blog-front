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
          <el-form-item label="名称" prop="categoryName">
            <el-input v-model="ruleForm.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="父节点" prop="categoryPid">
            <el-select v-model="ruleForm.categoryPid" placeholder="父节点">
              <el-option label="无" :value="0"></el-option>
              <el-option
                :label="item.categoryName"
                :value="item.categoryId"
                v-for="item in tableData"
                :key="item.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类描述" prop="categoryDescription">
            <el-input v-model="ruleForm.categoryDescription"></el-input>
          </el-form-item>
          <el-form-item label="图标样式" prop="categoryIcon">
            <el-input v-model="ruleForm.categoryIcon"></el-input>
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
        <p>分类最多只有两级，一级分类pid=0，二级分类pid=其父节点id</p>
        <p>如果该分类包含文章，将不可删除</p>
      </el-card>
    </el-col>

    <el-col :span="16" class="table">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="categoryId"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="categoryName" label="名称" sortable width="180">
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
              v-if="!scope.row.children || scope.row.children.length == 0"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="categoryId" label="ID"> </el-table-column>
        <el-table-column prop="categoryPid" label="PID"> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import {
  getArticleTypeListCount,
  addArticleType,
  updateArticleType,
  deleteArticleType,
} from "@/03-api/article";
import { buildTree } from "@/02-utils/customer";
const _form = {
  categoryName: "",
  categoryPid: 0,
  categoryDescription: "",
  categoryIcon: "",
  categoryOrder: 0,
  categoryId: null,
};
export default {
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(_form)),
      isAdd: true,
      rules: {
        categoryName: [
          { required: true, message: "请输入称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        categoryPid: [
          { required: true, message: "请选择父节点", trigger: "change" },
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
      this.$confirm(`您确定要删除${row.categoryName}吗`, "提示").then(
        async () => {
          const { code } = await deleteArticleType({ id: row.categoryId });
          if (code == 0) {
            this.$message.success("删除成功");
            this.loadCateList();
          }
        }
      );
    },
    async addSubmit() {
      const { code } = await addArticleType(this.ruleForm);
      if (code == 0) {
        this.$message.success("添加成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.loadCateList();
      }
    },
    async updateSubmit() {
      const { code } = await updateArticleType(this.ruleForm);
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
      const list = await getArticleTypeListCount();
      this.tableData = buildTree(list);
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