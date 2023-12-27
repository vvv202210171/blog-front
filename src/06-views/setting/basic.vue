<template>
  <el-card>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="100px"
      size="medium"
      v-loading="loading"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="content">
            <el-form-item class="" label="站点名称" prop="optionSiteTitle">
              <el-input v-model="form.optionSiteTitle" />
            </el-form-item>
            <el-form-item class="" label="站点描述" prop="optionSiteDescrption">
              <el-input v-model="form.optionSiteDescrption" />
            </el-form-item>
            <el-form-item class="" label="首页描述" prop="optionMetaDescrption">
              <el-input v-model="form.optionMetaDescrption" />
            </el-form-item>
            <el-form-item class="" label="首页关键词" prop="optionMetaKeyword">
              <el-input v-model="form.optionMetaKeyword" />
            </el-form-item>
            <el-form-item class="footer-btn">
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="小工具">
          <div class="content">
            <el-form-item class="" label="头像" prop="optionAboutsiteAvatar">
              <el-upload
                class="avatar-uploader"
                action="#"
                :http-request="customRequest"
                :show-file-list="false"
                :multiple="false"
                :data="{ k: 'optionAboutsiteAvatar' }"
              >
                <div class="image-box">
                  <!-- <img v-if="form.ImgUrl" :src="form.ImgUrl" class="avatar" /> -->
                  <img
                    v-if="form.optionAboutsiteAvatar"
                    :src="form.optionAboutsiteAvatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item class="" label="昵称" prop="optionAboutsiteTitle">
              <el-input v-model="form.optionAboutsiteTitle" />
            </el-form-item>
            <el-form-item class="" label="说明" prop="optionAboutsiteContent">
              <el-input v-model="form.optionAboutsiteContent" />
            </el-form-item>
            <el-form-item
              class=""
              label="微信二维码"
              prop="optionAboutsiteWechat"
            >
              <el-upload
                class="avatar-uploader"
                action="#"
                :http-request="customRequest"
                :show-file-list="false"
                :multiple="false"
                :data="{ k: 'optionAboutsiteWechat' }"
              >
                <div class="image-box">
                  <!-- <img v-if="form.ImgUrl" :src="form.ImgUrl" class="avatar" /> -->
                  <img
                    v-if="form.optionAboutsiteWechat"
                    :src="form.optionAboutsiteWechat"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item class="" label="QQ" prop="optionAboutsiteQq">
              <el-input v-model="form.optionAboutsiteQq" />
            </el-form-item>
            <el-form-item class="" label="微博" prop="optionAboutsiteWeibo">
              <el-input v-model="form.optionAboutsiteWeibo" />
            </el-form-item>
            <el-form-item class="" label="Github" prop="optionAboutsiteGithub">
              <el-input v-model="form.optionAboutsiteGithub" />
            </el-form-item>
            <el-form-item class="footer-btn">
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import { getOptionsList, updateOptions } from "@/03-api/setting";
import { uploadFile } from "@/03-api/article";

const _form = {
  optionId: 0,
  optionSiteTitle: 0,
  optionSiteDescrption: "",
  optionMetaDescrption: "",
  optionMetaKeyword: "",
  optionAboutsiteAvatar: 0,
  optionAboutsiteTitle: "",
  optionAboutsiteContent: "",
  optionAboutsiteWechat: "",
  optionAboutsiteQq: "",
  optionAboutsiteWeibo: "",
  optionAboutsiteGithub: "",
};
export default {
  name: "Update",
  data() {
    return {
      loading: false,
      cates: [],
      tags: [],
      form: {
        ..._form,
      },
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.getOptions();
    },

    async getOptions() {
      const data = await getOptionsList();
      Object.keys(this.form).forEach((k) => {
        this.form[k] = data[k];
      });
    },
    async customRequest(data, k) {
      const file = data.file;
      console.log(data, k);
      const formData = { file, dir: "upload" };
      const ret = await uploadFile(formData);
      this.form[data.data.k] = ret;
      // 如果要将 Data URL 赋值给 ImgUrl 属性，取消注释下一行。
      // this.form.ImgUrl = this.fileDataUrl;
    },
    async onSubmit() {
      try {
        this.loading = true;
        const param = { ...this.form };
        await updateOptions(param, { isAction: true });
        this.$message.success("修改成功");
        this.init();
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
