<template>
  <div>
      <h3>这是合同</h3>
      <el-dialog
        title="合同内容"
        :visible.sync="dialogVisible"
        width="70%">
        <el-button @click="num=num-1">上一页</el-button>
        <el-button @click="num++">下一页</el-button>
        <el-button @click="print()">打印</el-button>
        {{currentPage}} / {{pageCount}}
        <pdf ref="mypdf" src="./mayi.pdf" :page="num" 
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"></pdf>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
    components: {
       pdf
    },
    data() {
      return {  
        dialogVisible: false,
        num:1,
        currentPage:0,
        pageCount:0
      };
    },
    methods: {
       print(){
           this.$refs.mypdf.print()
       }
    }
  };
</script>

<style>

</style>