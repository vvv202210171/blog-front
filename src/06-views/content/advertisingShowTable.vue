<template>
    <div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="SortIndex" label="排序" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="Title"
            label="标题"
            min-width="150"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="CategoryTitle"
          label="所属类别"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="AdvertiseType" label="广告类型" min-width="130">
            <template #default="scope">
            {{ scope.row.AdvertiseType | advertiseTypeFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="ImageUrl" label="图片路径" show-overflow-tooltip>
          <template #default="scope">
            <el-image class="img" :src="scope.row.ImageUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="LinkUrl" label="链接路径" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="DisplayFrom" label="开始显示时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="DisplayTo" label="结算显示时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="Status" label="状态">
          <template #default="scope">
            <el-button :type="scope.row.Status == 1 ? 'success' : 'danger'">{{
              scope.row.Status | statusFormat
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="AddTime" label="发布时间" show-overflow-tooltip>
        </el-table-column>
  
        <el-table-column prop="address" label="操作" min-width="50">
          <template #default="scope">
            <!-- <el-button
              size="mini"
              icon="el-icon-document-copy"
              @click="copy(scope.row)"
            ></el-button> -->
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            ></el-button>
            <!-- <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="del(scope.row)"
            ></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  <script>
  import { AdvertiseStatusEnum, AdvertiseTypeEnum } from "@/02-utils/enum";
  export default {
    props: {
      tableData: {
        type: Array,
        default() {
          return [];
        },
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    data() {
      return {
        AdvertiseStatusEnum: AdvertiseStatusEnum,
        AdvertiseTypeEnum: AdvertiseTypeEnum,
      };
    },
    computed: {},
    created() {},
    methods: {
      copy(row) {},
      edit(row) {
        this.$router.push({
          path: "/content/advertisingManagementUpdate",
          query: { isAdd: true, Id: row.Id },
        });
      },
      del(row) {},
      handleSelectionChange(val) {},
    },
    filters: {
      statusFormat(s) {
        let obj = AdvertiseStatusEnum.find((v) => v.val == s);
        return obj ? obj.name : "";
      },

      advertiseTypeFormat(s) {
        let obj = AdvertiseTypeEnum.find((v) => v.val == s);
        return obj ? obj.name : "";
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .img {
    width: 100px;
    height: 50px;
    margin-right: 5px;
  }
  </style>
  