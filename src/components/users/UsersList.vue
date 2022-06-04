<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 添加与搜索  -->
      <el-header>
        <el-row style="margin-top: 15px">
          <!-- 搜索内容 -->
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="queryInfo.query"
              clearable
              @clear="getUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button> </el-input
          ></el-col>
          <!-- 添加内容 -->
          <el-col :span="2" :offset="6"
            ><el-button type="primary" @click="userAdd"
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </el-header>
      <el-main>
        <UserTable
          :userList="userList"
          @editUser="edit($event)"
          @delUser="del($event)"
      /></el-main>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total,sizes, prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户组件 -->
    <UserAdd
      :dialogVisible="dialogVisible"
      @toggle="changeVisible($event, 'add')"
      v-if="dialogVisible"
      ref="child"
      @close="closeDialog"
    />
    <!-- 修改用户信息组件 -->
    <UserEdit
      @toggle="changeVisible($event, 'edit')"
      :flag="flag"
      v-if="flag"
      ref="child"
      :data="editList"
      @close="closeDialog"
    />
  </div>
</template>
<script>
import UserTable from './UserTable'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
export default {
  components: { UserTable, UserAdd, UserEdit },
  data() {
    return {
      // 表格数据
      userList: [],
      // 用户数据参数
      queryInfo: {
        query: '',
        pagesize: 2,
        pagenum: 1
      },
      // 总用户数
      total: 0,
      // 控制添加用户组件
      dialogVisible: false,
      // 控制修改用户信息组件
      flag: false,
      editList: []
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
      // console.log(this.userList)
    },
    // 监听pagesize的改变
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
    },
    // 监听pagenum的改变
    handleCurrentChange(newNum) {
      // console.log(newNum)
      this.queryInfo.pagenum = newNum
    },
    // 添加用户按钮
    userAdd() {
      this.dialogVisible = !this.dialogVisible
    },
    // 隐藏对话框
    changeVisible(v, type) {
      // console.log(type)
      if (type == 'edit') {
        this.flag = v
      }
      if (type == 'add') {
        this.dialogVisible = v
      }
    },
    // 关闭对话框
    closeDialog() {
      // console.log(this.$refs.child.$refs.child.$refs.ruleForm)
      this.$refs.child.btn()
      this.$refs.child.$refs.child.$refs.ruleForm.resetFields()
      // console.log(type)
    },
    // 修改用户信息
    async edit(v) {
      const { data: res } = await this.$http.get(`users/${v.id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // console.log(res.data)
      this.editList = res.data
      this.flag = !this.flag
      // console.log(this.editList)
    },
    // 删除用户
    async del(id) {
      this.$confirm('是否删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(`users/${id}`)
          // console.log(res)
          if (res.meta.status != 200) return this.$message.error(res.meta.msg)
          // 提示删除成功信息
          this.$message.success(res.meta.msg)
          // 重新渲染数据  this.getUserList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  created() {
    // 渲染用户数据
    this.getUserList()
  }
}
</script>
<style lang="less" scoped>
.block {
  margin-top: 10px;
}
</style>
