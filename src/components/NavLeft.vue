<template>
  <div>
    <!-- 折叠 -->
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      background-color="rgb(172, 185, 190)"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
      router
      :default-active="activePath"
      :collapse-transition="false"
    >
      <!--菜单 -->
      <el-submenu
        :index="item.id.toString()"
        v-for="item in menuList"
        :key="item.id"
      >
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 导航列表 -->
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.id.toString()"
        >
          <el-menu-item
            :index="`/${subItem.path}`"
            @click="saveActivePath(`/${subItem.path}`)"
          >
            <i class="el-icon-menu"></i><span>{{ subItem.authName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'NavLeft',
  props: ['isCollapse'],
  data() {
    return {
      // 菜单栏数据
      menuList: [],
      // 激活装填
      activePath: '',
      // 图标对象
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      flag: this.isCollapse
    }
  },
  methods: {
    // 渲染菜单数据
    async renderList() {
      const { data: ret } = await this.$http.get('menus')
      // console.log(ret)
      if (ret.meta.status != 200) return this.$$message.error(ret.meta.msg)
      // console.log(ret)
      this.menuList = ret.data
    }, // 滑块 切换的折叠与展开
    toggleCollapse() {
      this.show = !this.show
      this.flag = !this.isCollapse
      this.$emit('toggle', this.flag)
    },
    // 保存链接的激活状态
    saveActivePath(v) {
      window.sessionStorage.setItem('activePath', v)
      this.activePath = v
    }
  },
  created() {
    // 渲染数据
    this.renderList()
    // 激活状态
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>
<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border: none;
}
.toggle-button {
  width: 100%;
  color: #fff;
  line-height: 24px;
  font-weight: bolder;
  font-size: 10px;
  text-align: center;
  background-color: #cbd3ec;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
