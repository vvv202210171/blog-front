<template>
  <div id="app" :class="'lang-' + lang">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['lang'])
  },
  created() {
  },
  methods: {

  }
}
</script>
