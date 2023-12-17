<template>
  <el-dialog class="create-user" :title="isEditor ? $t('report_0120'): $t('report_0121')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form ref="form" v-loading="beforeLoading" :rules="rules" :model="form" label-position="top">
      <el-form-item class="" :label="$t('report_0115')" prop="UserName">
        <el-input v-model="form.UserName" :readonly="isEditor" />
      </el-form-item>
      <el-form-item v-if="user.IsSuper" class="" :label="$t('report_0018')" prop="MerchantAlias">
        <el-select v-model="form.MerchantAlias" :placeholder="$t('report_0122')" filterable :disabled="isEditor" @change="loadUserGroupList">
          <el-option v-for="item of merchantList" :key="item.MerchantAlias" :value="item.MerchantAlias" :label="item.MerchantName" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="!user.IsSuper || form.MerchantAlias" class="" :label="$t('report_0123')" prop="UserGroupId" :disabled="isEditor">
        <el-select v-model="form.UserGroupId" :placeholder="$t('report_0124')">
          <el-option v-for="item of usergroup" :key="item.UserGroupId" :value="item.UserGroupID" :label="item.UserGroupName" />
        </el-select>
      </el-form-item>
      <el-form-item class="" :label="$t('report_0031')" prop="Enable">
        <el-radio-group v-model="form.Enable">
          <el-radio :label="true">{{ $t('common_0048') }}</el-radio>
          <el-radio :label="false">{{ $t('common_0049') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0054')" prop="Password">
        <el-input v-model="form.Password" type="text" show-password />
      </el-form-item>
      <el-form-item v-show="!isEditor" :label="$t('report_0116')" prop="ConfirmPassword">
        <el-input v-model="form.ConfirmPassword" type="text" show-password />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm()">{{ $t('common_0053') }}</el-button>
      <el-button @click="dialogFormVisible = false">{{ $t('common_0030') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser, updateUser, getUserGroupSimpleList } from '@/03-api/user'
import { simpleList } from '@/03-api/common'
import { mapGetters } from 'vuex'
import i18n from '@/locales/index'
const _form = {
  'UserName': '', // 用户名
  'MerchantAlias': '', // 商户编号
  'UserGroupId': '', // 用户组ID
  'Enable': true, // 用户状态   true：启用   false：禁用
  'Password': '' // 登录密码
}
export default {
  name: 'CreateUser',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (value === '') {
        callback(new Error(this.$t('login_0007')))
      } else if (value.length < 6) {
        callback(new Error(this.$t('report_0117')))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.isEditor) {
        callback()
      } else if (value === '') {
        callback(new Error(this.$t('report_0118')))
      } else if (value !== this.form.Password) {
        callback(new Error(this.$t('report_0119')))
      } else {
        callback()
      }
    }
    return {
      beforeLoading: false,
      loading: false,
      isEditor: false,
      dialogFormVisible: false,
      form: {
        ..._form
      },
      rules: {
        UserName: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        MerchantAlias: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        UserGroupId: [{ required: true, message: i18n.t('report_0016'), trigger: 'blur' }],
        Password: [{ validator: validatePass, trigger: 'blur' }],
        ConfirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      merchantList: [],
      usergroup: []
    }
  },
  computed: {
    ...mapGetters(['user', 'currency'])
  },
  watch: {
    async show(value) {
      if (value) {
        this.dialogFormVisible = true
        this.beforeLoading = true
        if (Object.keys(this.model).length) {
          this.isEditor = true
          this.form = { ...this.model, UserGroupId: this.model.UserGroupID }
        }
        if (this.user.IsSuper) {
          await this.loadMerchantList()
        } else {
          this.form.MerchantAlias = this.user.MerchantAlias
          await this.loadUserGroupList()
        }
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })

        this.beforeLoading = false
      }
    },
    dialogFormVisible(value) {
      if (!value) {
        this.$emit('closed', value)
        setTimeout(() => {
          this.isEditor = false
          this.form = { ..._form }
        }, 500)
      }
    }
  },
  methods: {
    async loadMerchantList() {
      try {
        const data = await simpleList()
        this.merchantList = data
      } catch (error) {
        console.log(error)
      }
    },
    async loadUserGroupList() {
      try {
        if (!this.isEditor) {
          this.form.UserGroupId = ''
        }
        const data = await getUserGroupSimpleList({ MerchantAlias: this.form.MerchantAlias })
        this.usergroup = data
      } catch (error) {
        console.log(error)
      }
    },
    confirm() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const param = { ...this.form }
          try {
            const _func = this.isEditor ? updateUser : addUser
            const { code, msg } = await _func(param, { isAction: true })
            this.loading = false
            if (code === 0) {
              const _msg = msg || (this.isEditor ? this.$t('common_0052') : this.$t('common_0055'))
              this.$message.success(_msg)
              this.dialogFormVisible = false
            }
          } catch (error) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.create-user {
  .el-dialog {
    width: 500px;
  }
}
</style>
