<template>
  <!-- 添加用户对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="flag"
    width="50%"
    @close="$emit('close')"
  >
    <!-- 中间内容区域 -->
    <div><AddForm ref="child" /></div>
    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="btn">取 消</el-button>
      <el-button type="primary" @click="add">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import AddForm from './AddForm'
export default {
  props: ['dialogVisible'],
  data() {
    return {
      flag: this.dialogVisible
    }
  },
  components: { AddForm },
  methods: {
    // 隐藏对话框
    btn() {
      this.flag = false
      this.$emit('toggle', this.flag)
    },
    // 添加用户
    add() {
      // this.$refs.child 获取子组件内容
      let child = this.$refs.child
      child.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return this.$message.warning('请填写相关信息')
        const { data: res } = await this.$http.post(`users`, child.ruleForm)
        console.log(res)
        if (res.meta.status != 201) return this.$message.warning(res.meta.msg)
        // 验证信息全部填写才隐藏对话框
        this.$message.success(res.meta.msg)
        this.btn()
        // 调用父组件的方法
        this.$parent.getUserList()
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
