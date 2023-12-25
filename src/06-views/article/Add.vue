<template>
  <el-form
    ref="form"
    :class="{ 'create-modal': !isEditor }"
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
            <el-form-item class="" label="允许评论" prop="IsComment">
              <el-switch v-model="form.IsComment"></el-switch>
            </el-form-item>

            <el-form-item class="" label="选择类别" prop="selectCates">
              <SelectTree :treeData="cates" v-model="form.selectCates" />
            </el-form-item>
            <el-form-item class="" label="显示状态" prop="status">
              <el-button-group>
                <el-button
                  :type="item.val == form.Status ? 'primary' : ''"
                  @click="checkStatusChange(item)"
                  v-for="item in checkStatus"
                  :key="item.val"
                  >{{ item.name }}</el-button
                >
              </el-button-group>
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
                  <img v-if="form.ImgUrl" :src="form.ImgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item class="" label="文章标题" prop="Title">
              <el-input v-model="form.Title" :disabled="isEditor" />
            </el-form-item>
            <el-form-item class="" label="排序数字" prop="SortId">
              <el-input v-model="form.SortId" />
            </el-form-item>
            <el-form-item class="" label="浏览次数" prop="Click">
              <el-input v-model="form.Click" />
            </el-form-item>
            <el-form-item class="" label="文章来源" prop="Source">
              <el-input v-model="form.Source" />
            </el-form-item>
            <el-form-item class="" label="文章作者" prop="Author">
              <el-input v-model="form.Author" />
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="详细描述">
          <el-form-item class="" label="调用别名" prop="CallIndex">
            <el-input v-model="form.CallIndex" />
          </el-form-item>
          <el-form-item class="" label="外部链接" prop="LinkUrl">
            <el-input v-model="form.LinkUrl" />
          </el-form-item>
          <el-form-item class="" label="内容摘要" prop="Zhaiyao">
            <el-input v-model="form.Zhaiyao" />
          </el-form-item>
          <el-form-item class="" label="内容介绍" prop="ContentHTML">
            <RichEditor
              @change="contentChange"
              :data="form.ContentHTML"
            /> </el-form-item
        ></el-tab-pane>
        <el-tab-pane label="seo选项">
          <el-form-item class="" label="SEO标题" prop="SeoTitle">
            <el-input v-model="form.SeoTitle" />
          </el-form-item>
          <el-form-item class="" label="SEO关健字" prop="SeoKeyword">
            <el-input v-model="form.SeoKeyword" />
          </el-form-item>
          <el-form-item class="" label="SEO描述" prop="SeoDescription">
            <el-input v-model="form.SeoDescription" /> </el-form-item
        ></el-tab-pane>
      </el-tabs>

      <el-form-item class="footer-btn">
        <el-button type="primary" @click="onSubmit">确认保存</el-button>
        <el-button @click="backLastPage">返回上一页</el-button>
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>
import { getArticleTypeList, add, update } from "@/03-api/article";
import RichEditor from "@/01-components/RichEditor";
import SelectTree from "@/01-components/SelectTree";
import { mapGetters } from "vuex";
import { ArticleStatusEnum } from "@/02-utils/enum";
const _form = {
  Id: 0,
  SiteId: 0,
  ChannelId: 0,
  CategoryId: 0,
  CallIndex: "",
  Title: "",
  Source: "",
  Author: "",
  LinkUrl: "",
  ImgUrl: "",
  SeoTitle: "",
  SeoKeyword: "",
  SeoDescription: "",
  Zhaiyao: "",
  ContentHTML: "",
  SortId: 0,
  Click: 100,
  GroupIds: 0,
  Status: ArticleStatusEnum[0].val,
  IsComment: true,
  CommentCount: 0,
  LikeCount: 0,
  selectCates: [],
  update_image: true,
};
export default {
  name: "Article",
  components: { RichEditor, SelectTree },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if (this.isEditor) {
        callback();
      } else if (!value) {
        callback(new Error(this.$t("report_0016")));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      isEditor: false,
      dialogFormVisible: false,
      cates: [],
      checkStatus: ArticleStatusEnum,
      file: null,
      form: {
        ..._form,
      },
      rules: {
        Title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        selectCates: [
          { required: true, message: "选择类别不能为空", trigger: "blur" },
        ],
        ContentHTML: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
        AdminUser: [{ validator: validateUserName, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["currency"]),
  },
  watch: {
    "form.selectCates": {
      handler(newVal) {
        if (newVal) {
          const len = newVal.length;
          this.form.CategoryId = newVal[len - 1];
        }
      },
      deep: true, // 启用深度监听
    },
  },
  created() {
    this.loadArticleList();
    this.init();
  },
  methods: {
    async loadArticleList() {
      const data = await getArticleTypeList();
      this.cates = this.buildTree(data);
    },
    init() {
      this.form.Status = this.checkStatus[0].val;
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
    customRequest(data) {
      const file = data.file;
      this.file = file;
      // 读取文件并转换为 Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.ImgUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // 如果要将 Data URL 赋值给 ImgUrl 属性，取消注释下一行。
      // this.form.ImgUrl = this.fileDataUrl;
    },
    checkStatusChange(checkItem) {
      this.form.Status = checkItem.val;
    },
    contentChange(data) {
      this.form.ContentHTML = data;
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
            this.$router.push({ path: "/content/articleManagement" });
          }
        });
    },
    async onSubmit() {
      try {
        this.loading = true;
        if (await this.$refs.form.validate()) {
          const param = { ...this.form };
          param.ImgUrl = this.file;
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
.cates {
  display: flex;
  .cates-drop {
    padding: 5px 12px 5px 5px;
    min-width: 200px;
    max-height: 300px;
    border-radius: 4px;
    overflow: hidden;
    overflow-y: auto;
  }
  .cates-select {
    margin-left: 10px;
    .cates-select-btn {
      margin-right: 5px;
    }
  }
}

.footer-btn {
  margin-top: 20px;
}
</style>
