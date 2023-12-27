<template>
  <div class="user">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      size="medium"
      key="form"
    >
      <el-form-item class="" label="头像" prop="userAvatar">
        <el-upload
          class="avatar-uploader"
          action="#"
          :http-request="customRequest"
          :show-file-list="false"
          :multiple="false"
        >
          <div class="image-box">
            <!-- <img v-if="form.ImgUrl" :src="form.ImgUrl" class="avatar" /> -->
            <img v-if="form.userAvatar" :src="form.userAvatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" name="userName" />
      </el-form-item>
      <el-form-item label="密码" prop="userPass">
        <el-input v-model="form.userPass" name="userPass" />
      </el-form-item>
      <el-form-item label="昵称" prop="userNickname">
        <el-input v-model="form.userNickname" type="text" name="userNickname" />
      </el-form-item>
      <el-form-item label="Email" prop="userEmail">
        <el-input v-model="form.userEmail" type="text" name="userEmail" />
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" type="text" />
      </el-form-item>
      <el-form-item>
        <div class="btns">
          <el-button type="primary" @click="confirm">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from "@/03-api/user";
import { uploadFile } from "@/03-api/common";
import { UserStatusEnum } from "@/02-utils/enum";
const _form = {
  userName: "",
  userNickname: "",
  userEmail: "",
  userAvatar: "",
  userUrl: "",
  userPass: "",
};

export default {
  name: "ChangeUserPassword",
  data() {
    const validEmail = (rule, value, callback) => {
      let emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        this.form.userEmail = this.form.userEmail.trim();
        callback();
      }
    };

    return {
      loading: false,
      dialogFormVisible: false,
      userStatus: UserStatusEnum,
      isRead: true,
      form: {
        ..._form,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userNickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        userPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userEmail: [{ required: true, validator: validEmail, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    handler() {},
    async customRequest(data) {
      const file = data.file;
      const res = await uploadFile({ file, dir: "img/avatar" });
      this.form.userAvatar = res;
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
            this.$router.push({ path: "/user/index" });
          }
        });
    },
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            let param = { ...this.form };
            const { code } = await addUser(param);
            this.loading = false;
            if (code === 0) {
              this.$message.success("添加成功");
              this.backLastPage();
            }
          } catch (error) {
            this.loading = false;
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
  filters: {
    statusFormat: (s) => {
      let obj = UserStatusEnum.find((v) => v.val == s);
      if (obj) {
        return obj.name;
      }
      return "N/A";
    },
  },
};
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  margin: 40px;
  width: 500px;
  .el-form-item--medium .el-form-item__content {
    line-height: 45px;
    width: 100%;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
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
}
</style>
