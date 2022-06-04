<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加角色 -->
      <el-row type="flex" justify="">
        <el-col
          ><el-button type="primary" @click="addRole"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column width="80px" type="expand">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-row
              :class="['borderTop', index == 0 ? 'borderBottom' : '', 'enter']"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable :disable-transitions="false">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[index == 0 ? '' : 'borderTop', 'vEnter']"
                  type="flex"
                  justify=""
                  v-for="(item, index) in item.children"
                  :key="item.id"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      :disable-transitions="false"
                      type="success"
                    >
                      {{ item.authName }}
                    </el-tag>
                  </el-col>
                  <!--三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item in item.children"
                      :key="item.id"
                      type="warning"
                      closable
                      :disable-transitions="false"
                      >{{ item.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
              <!-- {{ scope.row }} -->
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="300px">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="400px">
        </el-table-column>
        <el-table-column width="520px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改角色信息"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="editRole(scope.row.id)"
                >编辑</el-button
              >
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除角色"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delRole(scope.row.id)"
                >删除</el-button
              >
            </el-tooltip>
            <!-- 分配信息 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改角色分配权限信息"
              placement="top"
            >
              <el-button type="warning" icon="el-icon-setting"
                >分配权限信息</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 添加角色表单 -->
      <el-form
        :model="roleForm"
        status-icon
        :rules="rules"
        ref="roleForm"
        label-width="100px"
      >
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="roleForm.roleName"> ></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="password">
          <el-input type="text" v-model="roleForm.roleDesc"> ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('roleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑"
      :visible.sync="flag"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 添加角色表单 -->
      <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editForm"
        label-width="100px"
      >
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="editForm.roleName" disabled>
            ></el-input
          >
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="password">
          <el-input type="text" v-model="editForm.roleDesc"> ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="submit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 角色列表
      list: [],
      // 控制添加角色对话框的显示与隐藏
      dialogVisible: false,
      // 角色表单
      roleForm: {
        // 角色名称
        roleName: '',
        // 角色描述
        roleDesc: ''
      },
      // 表单验证规则
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名称' }
        ]
      },
      // 编辑角色
      editForm: [],
      // 控制编辑角色对话框的显示与隐藏
      flag: false
    }
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get(`roles`)
      // console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error('获取角色列表失败')
      this.$message.success(res.meta.msg)
      this.list = res.data
    },
    // 添加角色
    addRole() {
      this.dialogVisible = !this.dialogVisible
    },
    // 确定提交
    submit(formName) {
      // console.log(typeof formName)
      this.$refs[formName].validate(async (valid) => {
        // 添加角色
        if (formName == 'roleForm') {
          if (!valid) return this.$message.error('请填写角色名称')
          const { data: res } = await this.$http.post(`roles`, this.roleForm)
          // console.log(res)
          if (res.meta.status !== 201) return this.$message.error('添加失败')
          this.$message.success(res.meta.msg)
          // 隐藏对话框
          this.dialogVisible = !this.dialogVisible
        } else if (formName == 'editForm') {
          //编辑角色
          const { data: res } = await this.$http.put(
            `roles/${this.editForm.roleId}`,
            this.editForm
          )
          // console.log(res)
          if (res.meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success(res.meta.msg)
          // console.log(this.editForm)
          this.flag = !this.flag
        }
        // 重新渲染角色列表
        this.getRoleList()
      })
    },
    // 编辑角色
    async editRole(v) {
      // console.log(v)
      // 获取角色信息
      const { data: res } = await this.$http.get(`roles/${v}`)
      console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error('获取角色信息失败')
      this.$message.success(res.meta.msg)
      // 赋值
      this.editForm = res.data
      this.flag = !this.flag
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    // 删除角色
    delRole(id) {
      this.$confirm('是否删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(`roles/${id}`)
          // console.log(res)
          if (res.meta.status != 200) return this.$message.error(res.meta.msg)
          // 提示删除成功信息
          this.$message.success(res.meta.msg)
          // 重新渲染数据
          this.getRoleList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  created() {
    // 渲染角色列表
    this.getRoleList()
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 20px;
  .el-tag {
    margin: 7px;
  }
  .borderTop {
    border-top: 1px solid #eee;
  }
  .borderBottom {
    border-bottom: 1px solid #eee;
  }
  .vEnter {
    display: flex;
    align-items: center;
  }
  .enter {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
