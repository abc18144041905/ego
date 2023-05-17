<template>
  <div>
      <!-- <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/goods">商品分类</router-link>
        </li>
        <li>
          <router-link to="/advert">广告分类</router-link>
        </li>
        <li>
          <router-link to="/order">订单管理</router-link>
        </li><li>
          <router-link to="/params">规格参数</router-link>
        </li>
      </ul> -->
      
      <!-- <div v-if="!isCollapse" style="font-size:17px;color:#ffffff;text-align:center;line-height:50px">后台管理系统</div> -->
      <el-menu
        :collapse="isCollapse"
        router
        default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#273746"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/">
          <span slot="title" style="color:#ffffff;font-size:20px;text-align:center">{{$t("menu.sys")}}</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{$t("menu.home")}}</span>
        </el-menu-item>
        <el-menu-item index="/goods">
          <i class="el-icon-s-goods"></i>
          <span slot="title">{{$t("menu.cman")}}</span>
        </el-menu-item>
        <el-submenu index="/params">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{$t("menu.spar")}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/params/speci">
                  <i class="el-icon-setting"></i>
                  <span>{{$t("menu.spec")}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/advert">
          <i class="el-icon-document"></i>
          <span slot="title">{{$t("menu.acla")}}</span>
        </el-menu-item>
        <el-submenu index="/order">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{$t("menu.oman")}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/order/order-list">
                  <i class="el-icon-s-claim"></i>
                  <span>{{$t("menu.olis")}}</span>
            </el-menu-item>
            <el-menu-item index="/order/order-back">
                  <i class="el-icon-s-release"></i>
                  <span>{{$t("menu.rman")}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/user">
          <i class="el-icon-s-goods"></i>
          <span slot="title">{{$t("menu.user")}}</span>
        </el-menu-item>
      </el-menu>
   
  </div>
</template>

<script>
export default {
    props:['isCollapse'],
    
}
</script>

<style lang="less" scoped>

  .el-menu{
    border-right: none !important;
    .is-active{
      background:#273746 !important;
      
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>