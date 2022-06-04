<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="dialogVisible"
    width="50%"
    @close="$emit('close')"
  >
    <!-- 中间内容区域 -->
    <div><EditForm :data="editList" ref="child" /></div>
    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="btn">取 消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import EditForm from './EditForm'
export default {
  name: 'UserEdit',
  props: ['flag', 'data'],
  data() {
    return {
      editList: this.data,
      dialogVisible: this.flag
    }
  },
  components: { EditForm },
  methods: {
    // 隐藏对话框
    btn() {
      this.dialogVisible = false
      this.$emit('toggle', this.flag)
    },
    // 修改信息
    //     mobile: data.mobile,
    //     email: data.email,
    async submit() {
      let data = this.$refs.child.data
      console.log(data)
      const { data: res } = await this.$http.put(`users/${data.id}`, {
        mobile: data.mobile,
        email: data.email
      })
      if (res.meta.status !== 200) return this.$message.error('更新失败')
      this.$message.success('更新信息成功')
      // 调用父组件的方法
      this.$parent.getUserList()
      this.btn()
    }
  }
}
</script>
<style lang="less" scoped></style>
