<template>
  <el-form
    ref="form"
    :rules="rules"
    :model="form"
    label-position="left"
    label-width="100px"
    size="medium"
    v-loading="loading"
  >
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="content">
            <el-form-item class="" label="别名" prop="pageKey">
              <el-row>
                <el-col :span="4">
                  <el-input v-model="form.pageKey" />
                </el-col>
                <el-col :span="19"
                  ><span class="confirm"
                    >请填写2到20位，仅允许字母、下划线和减号组成（<i
                      class="color"
                      >请确保别名没重复）</i
                    ></span
                  ></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item class="" label="标题" prop="pageTitle">
              <el-row>
                <el-col :span="4">
                  <el-input v-model="form.pageTitle" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="内容" prop="pageContent">
              <RichEditor @change="contentChange" :data="form.pageContent" />
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-form-item class="footer-btn">
        <el-button type="primary" @click="onSubmit">确认保存</el-button>
        <el-button @click="backLastPage">返回上一页</el-button>
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>
import { addPage } from "@/03-api/page";
import RichEditor from "@/01-components/RichEditor";
import { ArticleStatusEnum } from "@/02-utils/enum";
const _form = {
  pageId: 0,
  pageTitle: "",
  pageKey: "",
  pageContent: "",
};
export default {
  name: "Article",
  components: { RichEditor },
  data() {
    return {
      loading: false,
      form: {
        ..._form,
      },
      articleStatus: ArticleStatusEnum,
      cates: [],
      tags: [],
      rules: {
        pageTitle: [
          { required: true, message: "标题不能为空", trigger: "blur" },
        ],
        pageKey: [
          { required: true, message: "别名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pageContent: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
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
            this.$router.push({ path: "/page/index" });
          }
        });
    },
    contentChange(data) {
      this.form.pageContent = data;
    },
    async onSubmit() {
      try {
        this.loading = true;
        if (await this.$refs.form.validate()) {
          const param = { ...this.form };
          await addPage(param, { isAction: true });
          this.$message.success("新增成功");
          this.backLastPage();
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.content {
  .confirm {
    margin-left: 10px;
    .color {
      color: #ff5722;
    }
  }
}
</style>
