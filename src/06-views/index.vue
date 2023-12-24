<template>
  <div class="index-container">
    <div class="hello">
      {{ $t("common_0035") }}: {{ user.UserName }} ({{ user.GroupName }})
    </div>
    <div class="title">{{ $t("common_0036") }}：</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageMixin from "@/07-mixins/page";
export default {
  name: "Index",
  components: {},
  mixins: [pageMixin],
  data() {
    return {
      list: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss">
.index-container {
  color: #333;
  padding: 15px;
  font-size: 14px;
  .title {
    padding-top: 10px;
  }
}
</style>
