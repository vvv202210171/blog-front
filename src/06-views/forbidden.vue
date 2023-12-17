<template>
  <div class="container view-access">
    <div class="panel panel-default">
      <div class="access">
        <div class="panel-heading text-center">
          区域限制
        </div>
        <div class="panel-body">
          <div class="access-lang">
            <p><strong>IP:</strong></p>
            <p class="ng-binding">{{ ip }}
            </p></div>
          <div class="access-lang">
            <p><strong>敬愛的客户:</strong></p>
            <p>您的IP地址禁止访问及使用本站。</p>
            <p>不便之处，敬请见谅！</p>
            <p><span class="color-blue ng-binding">{{ hostname }}</span> 启</p>
          </div>
          <div class="access-lang">
            <p><strong>Dear Valued Customers:</strong></p>
            <p>Viewing and using this website at your current IP Address is prohibited due to its website rules. </p>
            <p>We regret any inconvenience.</p>

            <p>From <span class="color-blue ng-binding">{{ hostname }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { check } from '@/03-api/common'
export default {
  name: 'Forbidden',
  data() {
    return {
      ip: '',
      hostname: ''
    }
  },
  created() {
    this.ip = this.$route.query.ip
    this.hostname = location.hostname
    this.check()
  },
  methods: {
    async check() {
      const { code, data } = await check({}, { isAction: true })
      this.ip = data
      if (code === 0) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss">
    .view-access {
        font-size: 12px;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #14234e 20%, #0e193b 100%);
        padding: 20vh 0;
        .panel {
            width: 588px;
            border: solid 3px #eee;
            margin: 0 auto;
            background-color: #ddd;
            padding: 3px;
            border-radius: 8px;
            .panel-heading {
                padding: 10px 15px;
                font-size: 30px;
                color: red;
                font-weight: bold;
                border-bottom: 2px solid #000;
            }

            .panel-body {
                padding: 15px;
            }

            .access {
                border: solid 2px #bce;
                background-color: #f5f5ff;
                border-radius: 6px;
                padding: 10px 5px;
                overflow: hidden;
            }

            .access-lang {
                padding: 10px;
                background-color: #fff;
                border-radius: 5px;
                border: solid 1px #cde;
                margin: 5px 0;

                p {
                    margin: 0 0 5px;
                }

                .color-blue {
                    color: blue;
                }
            }
        }
    }
</style>
