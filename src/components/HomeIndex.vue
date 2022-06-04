<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <h1>电商后台管理系统</h1>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '' : 'fade'">
        <!-- 导航栏 -->
        <NavLeft :isCollapse="isCollapse" @toggle="tBtn" />
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavLeft from './NavLeft'
export default {
  components: {
    NavLeft
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    // 退出
    logOut() {
      this.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 退出成功提示
          this.$message.success('退出登录成功')
          // 删除token值
          window.sessionStorage.clear()
          // 重定向路由至login页面
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.info('取消退出成功')
        })
    },
    // 折叠与展开
    tBtn(v) {
      this.isCollapse = v
      console.log(v)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.el-header {
  background-color: rgb(216, 229, 235);
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    width: auto;
    display: inline-block;
    color: rgb(199, 199, 108);
  }
  .el-button {
    background-color: rgb(237, 246, 241);
    border-radius: 15px;
    border: none;
    color: rgb(225, 165, 87);
  }
}
.el-aside {
  background-color: rgb(172, 185, 190);
}

.fade {
  animation: show 500ms linear;
}
@keyframes show {
  from {
    width: 200px !important;
  }
  to {
    width: 64px !important;
  }
}
</style>
