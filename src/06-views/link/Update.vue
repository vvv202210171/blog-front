<template>
  <el-row :gutter="20" class="cate">
    <el-col :span="8">
      <el-card class="card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="header"> {{ isAdd ? "添加链接" : "修改链接" }}</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="midum"
        >
          <el-form-item label="名称" prop="linkName">
            <el-input v-model="ruleForm.linkName"></el-input>
          </el-form-item>
          <el-form-item label="URL" prop="linkUrl">
            <el-input v-model="ruleForm.linkUrl"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="linkOwnerContact">
            <el-input v-model="ruleForm.linkOwnerContact"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="linkDescription">
            <el-input v-model="ruleForm.linkDescription"></el-input>
          </el-form-item>
          <el-form-item label="Order" prop="linkOrder">
            <el-input v-model="ruleForm.linkOrder"></el-input>
          </el-form-item>
          <el-form-item class="" label="状态" prop="linkStatus">
            <el-radio-group v-model="ruleForm.linkStatus">
              <el-radio
                :label="item.val"
                v-for="item in linkStatus"
                :key="item.val"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
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
        <p>URL：如 http://liuyanzhao.com</p>
        <p>Order：默认是0，Order越大排名越靠前</p>
      </el-card>
    </el-col>

    <el-col :span="16" class="table">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
      >
        <el-table-column prop="linkId" label="ID" sortable> </el-table-column>
        <el-table-column prop="linkName" label="名称" sortable>
        </el-table-column>
        <el-table-column
          prop="linkUrl"
          label="URL"
          sortable
          show-overflow-tooltip
        />
        <el-table-column prop="linkOrder" label="Order" sortable />

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
  </el-row>
</template>
<script>
import { getLinkList, delLink, getLink, updateLink } from "@/03-api/link";
import { LinkStatusEnum } from "@/02-utils/enum";
const _form = {
  linkName: "",
  linkUrl: "",
  linkOwnerContact: "",
  linkDescription: "",
  linkOrder: "",
  linkId: null,
  linkStatus: "",
};
export default {
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(_form)),
      isAdd: false,
      linkStatus: LinkStatusEnum,
      rules: {
        linkName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        linkUrl: [{ required: true, message: "URL不能为空", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  watch: {
    $route(to, from) {
      // 在这里根据参数的变化执行刷新页面的逻辑
      this.initEdit(this.$route.query.linkId);
    },
  },
  methods: {
    async initEdit(id) {
      const row = await getLink({ id });
      Object.keys(this.ruleForm).forEach((k) => {
        this.ruleForm[k] = row[k];
      });
      this.isAdd = false;
    },
    edit(row) {
      this.$router.replace({
        path: "/link/Update",
        query: { linkId: row.linkId, random: Math.random() },
      });
    },
    del(row) {
      this.$confirm(`您确定要删除${row.linkName}吗`, "提示").then(async () => {
        const { code } = await delLink({ id: row.linkId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.getLinkList();
        }
      });
    },
    async updateSubmit() {
      const { code } = await updateLink(this.ruleForm);
      if (code == 0) {
        this.$message.success("修改成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.getLinkList();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        this.updateSubmit();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getLinkList() {
      const list = await getLinkList();
      this.tableData = list;
    },
  },
  created() {
    this.getLinkList();
    this.initEdit(this.$route.query.linkId);
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