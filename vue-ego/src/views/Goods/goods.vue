<template>
   <div class="goods">
       <div class="header">
           <el-input @change="searchInp" v-model="input" :placeholder="$t('goods.plen')"></el-input>
           <el-button type="primary" @click="serachsatr">{{$t("goods.quer")}}</el-button>
           <el-button type="primary" @click="jump">{{$t("goods.addt")}}</el-button>
       </div>
       <div class="wrapper">
           <el-table
            border
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="36">
            </el-table-column>
            <el-table-column
                prop="id"
                :label="$t('goods.coid')"
                width="70">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="title"
                :label="$t('goods.trn')"
                width="100">
            </el-table-column>
            <el-table-column
                prop="price"
                :label="$t('goods.cpri')"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="num"
                :label="$t('goods.gnum')"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="category"
                :label="$t('goods.spec')" 
                width="100">
            </el-table-column>
            <el-table-column 
                show-overflow-tooltip
                prop="image"
                :label="$t('goods.imag')">
            </el-table-column>
            <el-table-column
               show-overflow-tooltip
                prop="sellPoint"
                :label="$t('goods.spoi')">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="descs"
                :label="$t('goods.desc')">
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
            <div class="all_delete">
                 <el-button @click="toggleSelection()" icon="el-icon-delete" type="danger">{{$t("goods.deal")}}</el-button>
            </div>
           
       </div>
       <MyPagination :total="total" :currentPage="currentPage" :pageSize="pageSize" @changePage="changePage"/>
   </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue"
export default {
  components:{
    MyPagination
  },
  data() {
    return {
      title:0,
      input: '',
      tableData: [],
      total:10,
      pageSize:1,
      type:1,
      list:[],
      currentPage:1,
      arrDelete:[]
    }
  },
  methods: {
      jump(){
        this.title = 0
        this.$router.push({path: '/addgoods',query: {msgtitle: this.title}})
      },
      serachsatr(){
        this.currentPage = 1
        const va = this.input
        this.searchInp(va)
        console.log(va) 
      },
      searchInp(search){
        if(!search){
           this.http(1);
           return;
        }else{
           this.$api.getSearch({
           search
           }).then(res=>{
             this.currentPage = 1
             if(res.data.status===200){
                this.list = res.data.result //获取搜索的总数据
                this.tableData = res.data.result.slice(0,3);
                this.total = res.data.result.length;
                this.pageSize = 3;
                this.type = 2
              }else{
                this.tableData = [];
                this.total = 1;
                this.pageSize = 1;
                this.type = 1;
              }
           })
        }
      },
      toggleSelection() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const idArr = this.arrDelete
         //请求接口 
         this.$api.deleteAllGoods({
             idArr
           }).then(res=>{
              if(res.data.status === 200){
                   this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    //视图更新
                    this.http(1);
                    this.currentPage = 1
              }
           })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.arrDelete = val.map(function(n){
              return n.id
        })
      },
      handleEdit(index, row) {
        this.title = 1
        this.$router.push({path: '/addgoods',query: {msgtitle: this.title,row}})
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          //请求接口
           this.$api.deleteGoods({
             id:row.id
           }).then(res=>{
              if(res.data.status === 200){
                   this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    //视图更新
                    this.http(1);
                    this.currentPage = 1
              }
           })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


        





      },
      changePage(num){
        this.currentPage = num
        if(this.type == 1){
           this.http(num)
        }else{
          this.tableData = this.list.slice((num-1)*3,num*3)
        }
         
      },
      http(page){
         this.$api.getGoodsList({
            page,
        }).then(res=>{
            if(res.data.status===200){
                this.tableData = res.data.data
                this.total = res.data.total
                this.pageSize = res.data.pageSize
                
            }
        }) 
      }
    },
    created(){
        this.http(1)
    }
}
</script>

<style lang="less" scoped>
    .goods{
        margin: 20px;
       width: calc(100%-200px);
    }
    .header{
        display: flex;
        button{
          margin-left: 20px;
        }
        
    }
    .wrapper{
        margin: 20px 0;
    }
    .all_delete{
      margin-top: 10px;
      button{
        display: block;
        float: right;
        margin-right: 58px;
      }
    }
</style>