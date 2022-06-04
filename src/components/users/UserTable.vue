<template>
  <el-table :data="userList" border style="width: 100%">
    <el-table-column type="index" label="序号" width="80px"></el-table-column>
    <el-table-column prop="username" label="姓名" width="180px">
    </el-table-column>
    <el-table-column prop="email" label="邮箱"> </el-table-column>
    <el-table-column prop="mobile" label="电话"> </el-table-column>
    <el-table-column prop="role_name" label="角色"> </el-table-column>
    <el-table-column prop="mg_state" label="状态" width="80px">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @change="stateChanged(scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <!-- 修改 -->
        <el-tooltip
          class="item"
          effect="dark"
          content="修改用户信息"
          placement="top"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="$emit('editUser', scope.row)"
          ></el-button>
        </el-tooltip>
        <!-- 删除 -->
        <el-tooltip
          class="item"
          effect="dark"
          content="删除用户"
          placement="top"
        >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="$emit('delUser', scope.row.id)"
          ></el-button>
        </el-tooltip>
        <!-- 修改角色 -->
        <el-tooltip
          class="item"
          effect="dark"
          content="修改用户角色信息"
          placement="top"
        >
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'UserTable',
  props: ['userList'],
  data() {
    return {}
  },
  methods: {
    // 监听Switch开关修改状态
    async stateChanged(v) {
      // console.log(v)
      const { data: res } = await this.$http.put(
        `users/${v.id}/state/${v.mg_state}`
      )
      // console.log(res)
      if (res.meta.status !== 200) {
        v.mg_state = !v.mg_state
        return this.$message.error(res.meta.msg)
      }
      this.$message.success('更新用户状态成功')
    }
  },
  created() {}
}
</script>
<style lang="less" scoped></style>
