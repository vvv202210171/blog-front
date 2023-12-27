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
          <el-form-item label="名称" prop="menuName">
            <el-input v-model="ruleForm.menuName"></el-input>
          </el-form-item>

          <el-form-item label="URL" prop="menuUrl">
            <el-input v-model="ruleForm.menuUrl"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="menuIcon">
            <el-input v-model="ruleForm.menuIcon"></el-input>
          </el-form-item>
          <el-form-item class="" label="菜单位置" prop="menuLevel">
            <el-radio-group v-model="ruleForm.menuLevel">
              <el-radio
                :label="item.val"
                v-for="item in menuLevels"
                :key="item.val"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Order" prop="menuOrder" v-if="!isAdd">
            <el-input v-model="ruleForm.menuOrder"></el-input>
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
        <p>1、图标为名称前面的字体图标，可选。采用的是element图标</p>
        <p>2、目前只有两种菜单：顶部菜单和主要菜单</p>
      </el-card>
    </el-col>

    <el-col :span="16" class="table">
      <el-tabs type="border-card">
        <el-tab-pane label="顶部菜单">
          <el-table
            :data="tableData1"
            style="width: 100%; margin-bottom: 20px"
            border
          >
            <el-table-column prop="menuName" label="名称" sortable />
            <el-table-column prop="menuUrl" label="URL" sortable />
            <el-table-column prop="menuOrder" label="Order" sortable />
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
            <el-table-column prop="menuId" label="ID" /> </el-table
        ></el-tab-pane>
        <el-tab-pane label="主要菜单">
          <el-table
            :data="tableData2"
            style="width: 100%; margin-bottom: 20px"
            border
          >
            <el-table-column prop="menuName" label="名称" sortable />
            <el-table-column prop="menuUrl" label="URL" sortable />
            <el-table-column prop="menuOrder" label="Order" sortable />
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
            <el-table-column prop="menuId" label="ID" /> </el-table
        ></el-tab-pane>
      </el-tabs>
      <el-card shadow="never">
        <h5>温馨提示：</h5>
        <p>1、Order的大小为菜单中各项目的顺序</p>
        <p>2、主要菜单的分类目录是默认显示的</p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getMenuList, addMenu, updateMenu, deleteMenu } from "@/03-api/setting";
import { MenuLevelEnum } from "@/02-utils/enum";
const _form = {
  menuName: "",
  menuId: 0,
  menuUrl: "",
  menuIcon: "",
  menuOrder: 0,
  menuLevel: MenuLevelEnum[0].val,
  menuId: null,
};
export default {
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(_form)),
      isAdd: true,
      menuLevels: MenuLevelEnum,
      rules: {
        menuName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        menuUrl: [{ required: true, message: "请输入URL", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  computed: {
    tableData1() {
      return this.tableData.filter((v) => v.menuLevel == 1);
    },
    tableData2() {
      return this.tableData.filter((v) => v.menuLevel != 1);
    },
  },
  methods: {
    edit(row) {
      Object.keys(this.ruleForm).forEach((k) => {
        this.ruleForm[k] = row[k];
      });
      this.isAdd = false;
    },
    del(row) {
      this.$confirm(`您确定要删除${row.menuName}吗`, "提示").then(async () => {
        const { code } = await deleteMenu({ id: row.menuId });
        if (code == 0) {
          this.$message.success("删除成功");
          this.loadMenuList();
        }
      });
    },
    async addSubmit() {
      const { code } = await addMenu(this.ruleForm);
      if (code == 0) {
        this.$message.success("添加成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.loadMenuList();
      }
    },
    async updateSubmit() {
      const { code } = await updateMenu(this.ruleForm);
      if (code == 0) {
        this.$message.success("修改成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.loadMenuList();
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

    async loadMenuList() {
      const list = await getMenuList();
      this.tableData = list;
    },
  },
  created() {
    this.loadMenuList();
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