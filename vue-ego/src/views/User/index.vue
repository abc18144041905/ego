<template>
   <div>
       <el-button @click="look">查看合同</el-button>
       <pdf ref="mypdf"></pdf>
   </div>
   
</template>

<script>
import pdf from './vuepdf.vue'
export default {
  components: {
    pdf
  },
  methods:{
      look(){
          this.$refs.mypdf.dialogVisible = true
      }
  }
}
</script>

<style>

</style>