<template>
  <div class="layout">
      <my-menu class="menu" :isCollapse="isCollapse"></my-menu>
      <con-tent :class="{isActive:isCollapse}" class="content" @changeCollapse="changeCollapse" :isCollapse="isCollapse"></con-tent>
  </div>
</template>

<script>
import MyMenu from './mymenu.vue'
import ConTent from './content.vue'
export default {
  components:{
     MyMenu,
     ConTent
  },
  data() {
      return {
        isCollapse: false
      };
    },
  methods:{
    changeCollapse(){
      this.isCollapse = !this.isCollapse
    }

  }
}
</script>

<style lang='less' scoped>
   .layout{
       display: -webkit-flex; /* Safari */
       display:flex;
       .menu{
           background-color: #273746;
           height: 100vh;   
       }
       .content{
          width: 0;
          flex: 1;
       } 
       
       
   }
</style>