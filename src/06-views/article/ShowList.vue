<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in tableData" :key="item.articleId"
        ><div class="grid-content">
          <el-card :body-style="{ padding: '0px' }" style="height: 100%">
            <el-image class="pic" :src="item.articleThumbnail">
              <div
                slot="error"
                class="image-slot"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  color: #ccc;
                "
              >
                <i class="el-icon-picture-outline" style="font-size: 40px"></i>
              </div>
            </el-image>

            <i class="absbg"></i>
            <h1 class="grid-content-title">
              <span
                ><a>{{ item.articleTitle }}</a></span
              >
            </h1>
            <div class="remark">
              <span>{{ item.articleSummary }}</span>
            </div>
            <div class="tools">
              <el-tag
                type=""
                class="tag"
                v-for="tag in item.tagList"
                :key="tag.tagId"
                >{{ tag.tagName }}</el-tag
              >
            </div>

            <div class="bottom grid-conten-bottom">
              <time class="time">{{ item.articleCreateTime | parseTime }}</time>
              <div class="grid-content-bottom-link">
                <el-link icon="el-icon-edit" @click="edit(item)"></el-link>
                <el-link icon="el-icon-delete" @click="del(item)"></el-link>
              </div>
            </div>
          </el-card></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    edit(row) {
      this.$emit("toEdit", row);
    },
    del(row) {
      this.$emit("toDel", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  height: 321px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .lock {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    height: 165px;
    color: #fff;
    font-size: 15px;
    text-shadow: 1px 1px 2px red;
    background: hsla(0, 0%, 100%, 0.9);
    opacity: 0.9;
    z-index: 1;
  }
  .lock:before {
    display: block;
    margin-bottom: 10px;
    font-size: 32px;
    font-style: normal;
    font-family: iconfont !important;
    content: "\E607";
  }
  .grid-content-check {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-table;
    padding: 2px 3px;
    border-left: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-radius: 0 0 0 4px;
    z-index: 1;
    background-color: hsla(0, 0%, 100%, 0.8);
    overflow: hidden;
  }
  .pic {
    position: relative;
    width: 100%;
    height: 165px;
    background: #fff;
    overflow: hidden;
  }
  .absbg {
    position: absolute;
    left: 0;
    top: 95px;
    width: 100%;
    height: 70px;
    background: #000;
    filter: alpha(opacity=20);
    opacity: 0.2;
  }
  .grid-content-title {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 69px;
    padding: 10px 20px;
    height: 50px;
    span {
      display: block;
      height: 50px;
      line-height: 25px;
      text-overflow: ellipsis;
      overflow: hidden;
      a {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        text-decoration: none;
      }
    }
  }
  .tag {
    margin-right: 5px;
  }
  .remark {
    display: block;
    margin: 15px 20px;
    padding: 0;
    height: 40px;
    color: #909399;
    font-size: 12px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tools {
    display: block;
    margin: 0 20px;
    height: 26px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .grid-conten-bottom {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    height: 20px;
  }
  .time {
    color: #c0c4cc;
    font-size: 10px;
    line-height: 20px;
  }
  .grid-content-bottom-link {
    display: flex;
    a {
      margin-right: 10px;
    }
  }
}
</style>
