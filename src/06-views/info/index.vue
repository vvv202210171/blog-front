<template>
  <div class="user">
    <el-card v-if="isRead">
      <div slot="header" class="clearfix">
        <span>信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="loadUser"
          >编辑</el-button
        >
      </div>
      <el-form label-suffix="：">
        <el-form-item label="头像">
          <el-image
            style="width: 100px; height: 100px"
            :src="user.userAvatar"
            fit="fit"
          ></el-image>
        </el-form-item>
        <el-form-item label="用户名">
          <span>{{ user.userName }}</span>
        </el-form-item>
        <el-form-item label="昵称">
          <span>{{ user.userNickname }}</span>
        </el-form-item>
        <el-form-item label="Email">
          <span>{{ user.userEmail }}</span>
        </el-form-item>
        <el-form-item label="URL">
          <span>{{ user.userUrl }}</span>
        </el-form-item>
        <el-form-item label="注册时间">
          <span>{{ user.userRegisterTime | parseTime }}</span>
        </el-form-item>
        <el-form-item label="最后登录时间">
          <span>{{ user.userLastLoginTime | parseTime }}</span>
        </el-form-item>
        <el-form-item label="最后登录IP">
          <span>{{ user.userUrl }}</span>
        </el-form-item>
        <el-form-item label="状态" prop="userStatus">
          <span>{{ user.userStatus | statusFormat }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-else>
      <div slot="header" class="clearfix">
        <span>修改个人信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="isRead = true"
          >查看</el-button
        >
      </div>
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="100px"
        size="medium"
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
              <img
                v-if="form.userAvatar"
                :src="form.userAvatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" name="userName" />
        </el-form-item>
        <el-form-item label="昵称" prop="userNickname">
          <el-input
            v-model="form.userNickname"
            type="text"
            name="userNickname"
          />
        </el-form-item>
        <el-form-item label="Email" prop="userEmail">
          <el-input v-model="form.userEmail" type="text" name="userEmail" />
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="form.url" type="text" />
        </el-form-item>
        <el-form-item label="状态" prop="userStatus">
          <el-radio-group v-model="form.userStatus">
            <el-radio
              :label="item.val"
              v-for="item in userStatus"
              :key="item.val"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="confirm">保存</el-button>
            <el-button @click="loadUser">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changeUserPassword } from "@/03-api/admin";
import { uploadFile } from "@/03-api/common";
import { UserStatusEnum } from "@/02-utils/enum";
import { mapGetters } from "vuex";
const _form = {
  userName: "",
  userNickname: "",
  userEmail: "",
  userAvatar: "",
  userUrl: "",
  userStatus: 1,
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
        userEmail: [{ required: true, validator: validEmail, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {},
  methods: {
    handler() {
      alert(1);
    },
    loadUser() {
      this.isRead = false;
      for (const key in this.form) {
        this.form[key] = this.user[key];
      }
    },
    async customRequest(data) {
      const file = data.file;
      const res = await uploadFile({ file });
      this.form.userAvatar = res;
    },
    confirm() {
      this.$refs.form.validate(async (valid) => {
        alert(valid);
        if (valid) {
          this.loading = true;
          const param = { ...this.form };
          try {
            const { code, msg } = await changeUserPassword(param, {
              isAction: true,
            });
            this.loading = false;
            if (code === 0) {
              const _msg = msg || this.$t("common_0052");
              this.$message.success(_msg);
              this.dialogFormVisible = false;
            }
          } catch (error) {
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
  justify-content: center;
  align-items: center;
  .el-card {
    width: 600px;
    margin-top: 50px;
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
}
</style>
