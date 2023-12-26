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
            <el-form-item class="" label="标题" prop="articleTitle">
              <el-input v-model="form.articleTitle" />
            </el-form-item>
            <el-form-item label="内容" prop="articleContent">
              <RichEditor @change="contentChange" :data="form.articleContent" />
            </el-form-item>
            <el-form-item class="" label="分类" prop="selectCates">
              <el-cascader
                v-model="form.selectCates"
                :options="cates"
                :props="{ label: 'categoryName', value: 'categoryId' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item class="" label="标签" prop="articleTagIds">
              <el-checkbox-group v-model="form.articleTagIds">
                <el-checkbox
                  :label="item.tagId"
                  v-for="item in tags"
                  :key="item.tagId"
                  >{{ item.tagName }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="" label="封面图片" prop="ImgUrl">
              <el-upload
                class="avatar-uploader"
                action="#"
                :http-request="customRequest"
                :show-file-list="false"
                :multiple="false"
              >
                <div class="image-box">
                  <!-- <img v-if="form.ImgUrl" :src="form.ImgUrl" class="avatar" /> -->
                  <img
                    v-if="form.articleThumbnail"
                    :src="form.articleThumbnail"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item class="" label="状态" prop="articleStatus">
              <el-radio-group v-model="form.articleStatus">
                <el-radio
                  :label="item.val"
                  v-for="item in articleStatus"
                  :key="item.val"
                  >{{ item.name }}</el-radio
                >
              </el-radio-group>
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
import {
  getArticleTypeList,
  add,
  uploadFile,
  getArticleTagList,
} from "@/03-api/article";
import RichEditor from "@/01-components/RichEditor";
import { ArticleStatusEnum } from "@/02-utils/enum";
import { buildTree } from "@/02-utils/customer";
const _form = {
  Id: 0,
  articleTitle: "",
  articleContent: "",
  articleParentCategoryId: "",
  articleChildCategoryId: "",
  articleThumbnail: "",
  articleStatus: ArticleStatusEnum[0].val,
  articleTagIds: [],
  selectCates: [],
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
        articleTitle: [
          { required: true, message: "标题不能为空", trigger: "blur" },
        ],
        selectCates: [
          { required: true, message: "选择类别不能为空", trigger: "blur" },
        ],
        articleContent: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    imgUrl() {
      return this.$store.state.settings.imgUrl;
    },
  },
  created() {
    this.loadArticleTypeList();
    this.loadArticleTagList();
  },
  methods: {
    async loadArticleTagList() {
      const data = await getArticleTagList();
      this.tags = data;
    },
    async loadArticleTypeList() {
      const data = await getArticleTypeList();
      this.cates = buildTree(data);
    },
    async customRequest(data) {
      const file = data.file;
      const formData = { file, dir: "thumbnail/random" };
      const ret = await uploadFile(formData);
      this.form.articleThumbnail = ret;
      // 如果要将 Data URL 赋值给 ImgUrl 属性，取消注释下一行。
      // this.form.ImgUrl = this.fileDataUrl;
    },
    handleChange() {
      const len = this.form.selectCates.length;
      if (len >= 1) {
        this.form.articleParentCategoryId = this.form.selectCates[0];
      }
      if (len == 2) {
        this.form.articleChildCategoryId = this.form.selectCates[1];
      }
    },
    checkStatusChange(checkItem) {
      this.form.articleStatus = checkItem.val;
    },
    contentChange(data) {
      this.form.articleContent = data;
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
            this.$router.push({ path: "/article/index" });
          }
        });
    },
    async onSubmit() {
      try {
        this.loading = true;
        if (await this.$refs.form.validate()) {
          const param = { ...this.form };
          await add(param, { isAction: true });
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
  padding: 10px;
  .html {
    height: 200px;
  }
  .image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 98px;
    height: 98px;
    cursor: pointer;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .check {
    padding: 9px 10px;
  }
}

.footer-btn {
  margin-top: 20px;
}
</style>
