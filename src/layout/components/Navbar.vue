<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div style="display: inline-block; font-size: 14px; line-height: 60px; float: right;">
      <!-- <span v-if="hasRoleDeposit" style="padding: 10px;margin-right: 5px;border-radius: 30px" :class="total.depositRequestCount >0 ? 'spanRequest':'spanRequest1'"><a @click="depositUrl()">入款请求：{{ total.depositRequestCount }}</a></span> -->
      <span v-if="hasRoleWithdraw" style="padding: 10px;border-radius: 30px" :class="total.cashoutOrderRequestCount >0 ? 'spanRequest':'spanRequest1'"><a @click="withdrawUrl()">{{ $t('report_0365') }}{{ total.cashoutOrderRequestCount }}</a></span>
      <a><span v-if="hasRoleWithdraw" style="padding: 20px;" :class="showMusic?'el-icon-message-solid spanVoice-open':'el-icon-bell spanVoice-close'" @click="music"> {{ showMusic?$t('report_0366'):$t('report_0367') }}</span></a>

      <div class="right-menu">
        <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatarGif" class="user-avatar"> -->
            <span>{{ user.UserName }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editorPassword">
              <span style="display:block;">{{ $t('common_0077') }}</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">{{ $t('common_0073') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="audioctrol" class="" />
    <!-- <audio id="audio1" src="./Music/deposit_default.mp3" class="audio1" preload="auto" :muted="!showMusic" /> -->
    <audio id="audio2" src="./Music/member_withdrawal_default.mp3" class="audio2" preload="auto" :muted="!showMusic" />
    <EditorPassword :show="showEditorPassword" @closed="onClosed" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout, waitRecordCount } from '@/03-api/common'
import Breadcrumb from '@/01-components/Breadcrumb'
import Hamburger from '@/01-components/Hamburger'
// import ErrorLog from '@/01-components/ErrorLog'
// import Screenfull from '@/01-components/Screenfull'
// import SizeSelect from '@/01-components/SizeSelect'
// import Search from '@/01-components/HeaderSearch'
import { checkPagePermission } from '@/02-utils/permission'
import avatarGif from '@/assets/images/icon.gif'

import EditorPassword from './editorPassword.vue'
// let player1 = document.querySelector('#audio1')
let player2 = document.querySelector('#audio2')
let timer = null
export default {
  components: {
    Breadcrumb,
    Hamburger,
    // SizeSelect,
    EditorPassword
  },
  data() {
    return {
      avatarGif: avatarGif + '?=' + Date.now(),
      total: {
        cashoutOrderRequestCount: 0
      },
      showEditorPassword: false,
      hasRoleWithdraw: false,
      showMusic: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'user'
    ])
  },
  created() {
    // this.hasRoleDeposit = checkPagePermission('/balance/depositApproval')

    this.hasRoleWithdraw = checkPagePermission('/xpay/WithdrawalConfirm')
    if (this.hasRoleWithdraw) {
      clearInterval(timer)
      timer = setInterval(() => {
        this.waitRecordCount()
      // debugger
      }, 10000)
    }
  },
  mounted() {
    // player1 = document.querySelector('#audio1')
    player2 = document.querySelector('#audio2')
    // setTimeout(() => {
    //   player1.volume = 1.0
    //   player2.volume = 1.0
    // }, 1000)
  },
  destory() {
    clearInterval(timer)
  },
  methods: {
    music() {
      // setInterval(this.waitRecordCount(), 5000)
      if (this.showMusic) {
        this.showMusic = false
        // player1.volume = 0.0
        player2.volume = 0.0
      } else {
        // player1.volume = 1
        player2.volume = 1
        this.showMusic = true
      }
      // this.waitRecordCount()
    },
    onClosed() {
      this.showEditorPassword = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await logout()
      await this.$store.dispatch('admin/logout')
      this.$router.push(`/login`)
    },
    async withdrawUrl() {
      this.$router.push('/xpay/WithdrawalConfirm')
    },
    async waitRecordCount() {
      const [cashoutOrderRequestCount] = await waitRecordCount()
      this.total = {
        cashoutOrderRequestCount
      }
      if (this.showMusic) {
        if (this.total.cashoutOrderRequestCount > 0) {
          if (!this.hasRoleWithdraw) {
            player2.volume = 0.0
          }
          // const audio = new Audio(withdrawalMusic)
          // audio.setAttribute('muted', true)
          // audio.addEventListener('canplay', () => { audio.play() })
          player2 && player2.play()
        }
      }
    },
    editorPassword() {
      this.showEditorPassword = true
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .spanRequest{
    background-color: red;
    color: #fff;
  }
  .spanRequest1{
    background-color: #fff;
    color: #000;
  }

  .spanVoice-close{
    color: red;
  }

  .spanVoice-open{
    color: blue;
  }

  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<!-- <style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style> -->
