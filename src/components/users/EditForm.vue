<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="75px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input type="text" disabled v-model="ruleForm.username"> ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="ruleForm.email"> ></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input type="text" v-model.number="ruleForm.mobile"> ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: ['data'],
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      ruleForm: this.data,
      rules: {
        //  用户名验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // 邮箱验证
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        // 手机号码验证
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
            validator: validatePhone
          }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
