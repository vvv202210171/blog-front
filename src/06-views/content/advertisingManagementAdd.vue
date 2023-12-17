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
              <el-form-item class="" label="选择类别" prop="selectCates">
                <SelectTree :treeData="cates" v-model="form.selectCates" />
              </el-form-item>
              <el-form-item class="" label="广告类型" prop="advertiseType">
                <el-button-group>
                  <el-button
                    :type="item.val == form.AdvertiseType ? 'primary' : ''"
                    @click="checkAdvertiseTypeChange(item)"
                    v-for="item in checkAdvertiseType"
                    :key="item.val"
                    >{{ item.name }}</el-button
                  >
                </el-button-group>
                <br>
                <span class="label">{{ tipText }}</span>
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
              <el-form-item class="" label="广告图片" prop="Image">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :http-request="customRequest"
                  :show-file-list="false"
                  :multiple="false"
                >
                  <div class="image-box">
                    <!-- <img v-if="form.Image" :src="form.Image" class="avatar" /> -->
                    <img v-if="form.Image" :src="form.Image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item class="" label="广告标题" prop="Title">
                <el-input v-model="form.Title" :disabled="isEditor" />
              </el-form-item>

              <el-form-item label="广告显示日期">
                <el-date-picker
                v-model="publishDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item class="" label="排序数字" prop="SortIndex">
                <el-input v-model="form.SortIndex" />
              </el-form-item>
              <el-form-item class="" label="外部链接" prop="LinkUrl">
                <el-input v-model="form.LinkUrl" />
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
  import { getArticleTypeList, mergeAdvertise } from "@/03-api/article";
  import RichEditor from "@/01-components/RichEditor";
  import SelectTree from "@/01-components/SelectTree";
  import { mapGetters } from "vuex";
  import { AdvertiseStatusEnum, AdvertiseTypeEnum } from "@/02-utils/enum";
  import dayjs from "dayjs";
  const format = "YYYY-MM-DD HH:mm:ss";
  const _form = {
    Id: 0,
    SiteId: 0,
    ChannelId: 0,
    AdvertiseType: AdvertiseTypeEnum[0].val,
    CategoryId: 0,
    Title: "",
    LinkUrl: "",
    Image: "",
    SortIndex: 0,
    Status: AdvertiseStatusEnum[0].val,
    update_image: true,
    DisplayFrom:"",
    DisplayTo:"",
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
        publishDate: [
            dayjs().subtract(7, "day").format(format),
            dayjs().format(format), ],
        cates: [],
        checkStatus: AdvertiseStatusEnum,
        checkAdvertiseType: AdvertiseTypeEnum,
        file: null,
        tipText: AdvertiseTypeEnum[0].tip,
        form: {
          ..._form,
        },
        rules: {
          Title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
          selectCates: [
            { required: true, message: "选择类别不能为空", trigger: "blur" },
          ],
        //   AdminUser: [{ validator: validateUserName, trigger: "blur" }],
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
        this.form.AdvertiseType = this.checkAdvertiseType[0].val;
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
          this.form.Image = e.target.result;
        };
        reader.readAsDataURL(file);
  
        // 如果要将 Data URL 赋值给 Image 属性，取消注释下一行。
        // this.form.Image = this.fileDataUrl;
      },
      checkStatusChange(checkItem) {
        this.form.Status = checkItem.val;
      },
      checkAdvertiseTypeChange(checkItem) {
        this.form.AdvertiseType = checkItem.val;
        this.tipText = checkItem.tip;
      },
      backLastPage() {
        this.$store
          .dispatch("tagsView/delView", this.$router)
          .then(({ visitedViews }) => {
            this.$router.go(-1);
          });
      },
      async onSubmit() {
        try {
          this.loading = true;
          let dateLen = this.publishDate ? this.publishDate.length : 0;
          if (await this.$refs.form.validate()) {
            const param = { ...this.form };
            param.Image = this.file;
            param.DisplayFrom = dateLen == 2 ? dayjs(this.publishDate[0]).format(format) : dayjs().subtract(7, "day").format(format);
            param.DisplayTo = dateLen == 2 ? dayjs(this.publishDate[1]).format(format) : dayjs().format(format);
            await mergeAdvertise(param, { isAction: true });
            this.$message.success("新增成功");
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
    .label{
        color: red;
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
  