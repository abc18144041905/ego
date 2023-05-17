<template>
   <div class="params">
       <div class="nav">
           <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>规格参数</el-breadcrumb-item>
            <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
            </el-breadcrumb>
       </div>
       <div class="header">
           <el-input @change="searchInp1" v-model="input" :placeholder="$t('goods.plen')"></el-input>
           <el-button type="primary" @click="serachsatr1">{{$t("goods.quer")}}</el-button>
           <el-button type="primary" @click="jumparamsdlog">{{$t("goods.addt")}}</el-button>
           <params-dlog ref="dlog"></params-dlog>
       </div>
       <div class="form">
           <template>
            <el-table class="my-table"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="规格参数ID"
                width="100">
                </el-table-column>
                <el-table-column
                prop="itemCatId"
                label="类目ID"
                width="100">
                </el-table-column>
                <el-table-column
                prop="specsName"
                label="规格名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="paramData"
                label="规格参数">
                </el-table-column>
                <el-table-column :label="$t('goods.oper')">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)">{{$t("goods.edit")}}</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)">{{$t("goods.dele")}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
       </div>
       <MyPagination :total="total" :currentPage="currentPage" :pageSize="pageSize" @changePage="changePage"/>
   </div>
</template>

<script>
import MyPagination from "../../../components/MyPagination.vue";
import ParamsDlog from './paramsDialog.vue'
export default {
    components:{
         MyPagination,
         ParamsDlog
     },
     data() {
      return {
          dlog:false,
          type:1,
          currentPage:1,
          total:10,
          pageSize:1,
          input:'',
          page:1,
          tableData: []
      }
    },
    methods:{
        http(page){
           this.$api.getParams({
               page
           }).then(res=>{
               if(res.data.status === 200){
                    this.tableData = res.data.data
                    this.total = res.data.total
                    this.pageSize = res.data.pageSize
               }
           })
         },
         changePage(num){
            this.currentPage = num
            if(this.type == 1){
                this.http(num)
            }else{
                this.tableData = this.list.slice((num-1)*3,num*3)
            }
            
        },
        searchInp1(){

        },
        serachsatr1(){

        },
        jumparamsdlog(){
            this.$refs.dlog.outerVisible = true;
        }
    },
    mounted(){
        
    },
    created(){
      this.http(1)
    }
  }

</script>

<style lang="less" scoped>
  .nav{
       padding: 10px;
       background-color:#fff;
       border: #eee solid 1px;
   }
   .params{
       margin: 10px;
       
   }
   .header{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        button{
          margin-left: 20px;
        }
        
    }
    .my-table{
      margin: 10px auto;
    }
</style>