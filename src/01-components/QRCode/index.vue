<template>
  <div ref="qrcode" class="qrcode" />
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'QRCode',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '100'
    },
    height: {

      type: [String, Number],
      default: '100'
    }
  },
  watch: {
    src: {
      handler(value) {
        if (!value) return
        this.creatQrCode(value)
      },
      immediate: true
    }
  },

  methods: {
    creatQrCode() {
      this.$nextTick(() => {
        new QRCode(this.$refs.qrcode, {
          text: this.src,
          width: this.width,
          height: this.height,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      })
    }
  }
}
</script>
