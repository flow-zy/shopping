<template>
  <div id="box">
    <div class="loginAndRegBox">
      <el-header>欢迎来到商品管理系统</el-header>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="75px"
        class="demo-loginForm"
      >
        <!-- 用户 -->
        <el-form-item class="name" label="用户" prop="username">
          <el-input type="text" v-model="loginForm.username">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="pass" label="密码" prop="password">
          <el-input
            type="password"
            show-password
            v-model="loginForm.password"
            autocomplete="off"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="last">
          <el-button
            type="primary"
            size="medium"
            round
            @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button size="medium" round @click="resetForm('loginForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data() {
    return {
      loginForm: {
        password: '',
        username: ''
      },
      //验证姓名与密码的则
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录
    submitForm(formName) {
      // 进行表单验证
      this.$refs[formName].validate(async (valid) => {
        // 错误填写信息
        if (!valid) return this.$message.error('请输入账号或密码')
        const { data: ret } = await this.$http.post('login', this.loginForm)
        // 不存在账号时
        if (ret.data == null)
          return this.$message.error('账号不存在，请注册账号')
        // 密码输入错误
        if (ret.meta.status !== 200) return this.$message.warning(ret.meta.msg)
        // 密码输入正确
        this.$message.success(ret.meta.msg + '，3秒之后跳至首页')
        // 存储token
        window.sessionStorage.setItem('token', ret.data.token)
        // 通过编程导航跳转 至/home
        setTimeout(() => {
          this.$router.push('/home')
          // 删除表单信息
          this.$refs[formName].resetFields()
        }, 3000)
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
#box {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../assets/images/login_bg.jpg') no-repeat 0 0 / cover;
}
.loginAndRegBox {
  width: 420px;
  height: auto;
  background-color: rgba(247, 245, 245, 0.51);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  text-align: center;
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    font-weight: bolder;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .el-input {
    width: 300px;
  }
}
</style>
