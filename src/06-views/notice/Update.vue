<template>
  <el-row :gutter="20" class="cate">
    <el-col :span="24">
      <el-card class="card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="header"> 修改公告</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="midum"
        >
          <el-form-item label="标题" prop="noticeTitle">
            <el-input v-model="ruleForm.noticeTitle"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="noticeContent">
            <RichEditor
              @change="contentChange"
              :data="ruleForm.noticeContent"
            />
          </el-form-item>
          <el-form-item label="Order" prop="noticeOrder">
            <el-input v-model="ruleForm.noticeTitle"></el-input>
          </el-form-item>
          <el-form-item class="" label="状态" prop="noticeStatus">
            <el-radio-group v-model="ruleForm.noticeStatus">
              <el-radio
                :label="item.val"
                v-for="item in noticeStatus"
                :key="item.val"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="never" class="card">
        <h5>温馨提示：</h5>
        <p>URL：如 http://liuyanzhao.com</p>
        <p>Order：默认是0，Order越大排名越靠前</p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { updateNotice, getNotice } from "@/03-api/notice";
import RichEditor from "@/01-components/RichEditor";
import { NoticeStatusEnum } from "@/02-utils/enum";
const _form = {
  noticeTitle: "",
  noticeContent: "",
  noticeOrder: "",
  noticeId: null,
  noticeStatus: 0,
};
export default {
  components: { RichEditor },
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(_form)),
      isAdd: true,
      noticeStatus: NoticeStatusEnum,
      rules: {
        noticeTitle: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        noticeContent: [
          { required: true, message: "URL不能为空", trigger: "blur" },
        ],
      },
      tableData: [],
    };
  },
  created() {
    this.init(this.$route.query.noticeId);
  },
  methods: {
    async init(id) {
      const ret = await getNotice({ id });
      Object.keys(this.ruleForm).forEach((k) => {
        this.ruleForm[k] = ret[k];
      });
    },
    contentChange(data) {
      this.ruleForm.noticeContent = data;
    },
    backLastPage() {
      this.$store
        .dispatch("tagsView/delView", this.$route)
        .then(({ visitedViews }) => {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            // 使用 replace 方法将路由替换为最后一个标签页的路由，实现关闭当前标签页
            this.$router.replace(latestView.path);
          } else {
            // 如果没有其他标签页，可以跳转到指定的路由或返回上一页
            this.$router.push({ path: "/notice/index" });
          }
        });
    },
    async updateSubmit() {
      const { code } = await updateNotice(this.ruleForm);
      if (code == 0) {
        this.$message.success("修改成功");
        this.ruleForm = JSON.parse(JSON.stringify(_form));
        this.backLastPage();
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