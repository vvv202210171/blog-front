<template>
  <el-dialog
    class="create-user"
    :title="$t('common_0077')"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0115')">
        <el-input v-model="user.userName" :readonly="true" />
      </el-form-item>
      <el-form-item :label="$t('common_0079')" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('common_0078')" prop="newPassword">
        <el-input v-model="form.newPassword" type="text" show-password />
      </el-form-item>
      <el-form-item :label="$t('report_0116')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="text" show-password />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{
        $t("common_0053")
      }}</el-button>
      <el-button @click="dialogFormVisible = false">{{
        $t("common_0030")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeUserPassword } from "@/03-api/admin";
import { mapGetters } from "vuex";
const _form = {
  oldPassword: "", // 旧密码
  newPassword: "", // 新密码
};
export default {
  name: "ChangeUserPassword",
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
    const validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("report_0200")));
      } else if (value.length < 6) {
        callback(new Error(this.$t("report_0117")));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("report_0201")));
      } else if (value.length < 6) {
        callback(new Error(this.$t("report_0117")));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("report_0118")));
      } else if (value !== this.form.newPassword) {
        callback(new Error(this.$t("report_0119")));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        ..._form,
      },
      rules: {
        oldPassword: [{ validator: validateOldPass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    show(value) {
      if (value) {
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
    dialogFormVisible(value) {
      if (!value) {
        this.isEditor = false;
        this.form = { ..._form };
        this.$emit("closed", value);
      }
    },
  },
  created() {},
  methods: {
    confirm() {
      this.$refs.form.validate(async (valid) => {
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
};
</script>

<style lang="scss">
.create-user {
  .el-dialog {
    width: 500px;
  }
}
</style>
