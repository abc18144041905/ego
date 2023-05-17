<template>
  <div>
    <div class="header">
      <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
      <i v-else @click="changeMenu" class="iconfont icon-left-indent"></i>
      <div class="header-right">
        <el-dropdown @command='clickLang'>
        <span class="el-dropdown-link">
          <span>{{$t("menu.mult")}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          
        </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
            <span style="margin-left:20px">{{$t("menu.welc")}}</span>
            <span style="margin-left:5px;margin-right:20px">{{userinfo.user}}</span>
            <span class="logout" @click="logout" style="cursor:pointer;">{{$t("menu.lout")}}</span>
        </div>
      </div>
    </div>
    <div class="contentc">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    props:['isCollapse'],
    computed:{
       ...mapState('loginModule',['userinfo'])
    },
    methods:{
      ...mapMutations('loginModule',['clearUser']),
      logout(){
        //清空vuex数据
        this.clearUser()
        //清空本地存储
        localStorage.removeItem('user')
        //返回登录页面
        this.$router.push('/login')
      },
      clickLang(command){
          this.$i18n.locale = command
      },
      changeMenu(){
        this.$emit('changeCollapse')
      }
    }
}
</script>

<style lang="less" scoped>
.header{
  padding-top: 8px;
  height: 36px;
  
  background-color: #545c64;
  .iconfont{
    font-size: 24px;
    color: #ffffff;
  }
}
.contentc{
  height: calc(100vh - 44px);
  overflow: auto;
}
.header-right{
    float: right;
    padding-right: 20px;
    display: flex;
    .user{
      margin-right: 20px;
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .logout:hover{
      color:#fff
  }
</style>