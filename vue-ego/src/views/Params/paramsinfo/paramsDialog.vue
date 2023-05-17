<template>
  <div>
      <el-dialog
        title="添加规格参数"
        :visible.sync="outerVisible"
        width="50%">
        <tree-goods @sendTreeData="sendTreeData"></tree-goods>
        <el-dialog
            width="50%"
            title="商品规格参数配置"
            :visible.sync="innerVisible"
            append-to-body>
         <div>当前选中的商品：{{treeData.name}}</div>
         <el-button style="margin-bottom:10px;margin-top:10px" @click="addDomain">新增规格列表</el-button>
         <hr/>


           <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
  
            <el-form-item
                v-for="(item, index) in dynamicValidateForm.grounps"
                :label="item.title + index"
                :key="index"
                :prop="item.value"
                :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
            >
            <el-input class="el-input__innerz" v-model="item.title"></el-input>
            <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
            <el-button @click.prevent="removeDomain(index)">删除</el-button>
                     <el-form-item
                        v-for="(ele, i) in item.children"
                        :label="ele.title + i"
                        :key="i"
                        :prop="ele.title"
                        :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                    <el-input  class="el-input__innerz" v-model="ele.title"></el-input>
                  <el-button @click.prevent="removechildDomain(index,i)">删除</el-button>
                    </el-form-item>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item> -->
            </el-form>



         <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
                <!-- <el-button  @click="resetForm('dynamicValidateForm')" >重置</el-button> -->
            </span>
         </el-dialog>
            <span slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true" :disabled="isDis">确定并添加分组</el-button>
            </span>
        </el-dialog>
        <!-- 二级弹框 -->

  </div>
</template>

<script>
import TreeGoods from '../../Goods/treegoods.vue'
export default {
    components:{
       TreeGoods
    },
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        isDis:true,
        treeData:{},
        dynamicValidateForm: {
          grounps: [],
        }
      };
    },
    methods: {
      sendTreeData(data){
         if(data.$treeNodeId){
             this.isDis = false
             this.treeData = data
         }
      },
      submitForm(formName) {
          
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log("提交成功")
              //itemCatId,content,specsName
            let content = JSON.stringify(this.dynamicValidateForm.grounps)  
            let itemCatId = this.treeData.cid
            let specsName = this.treeData.name
            this.$api.itemParams({
                itemCatId,
                content,
                specsName
            }).then(res=>{
                 if(res.data.status === 200){
                     this.$message({
                        message: '恭喜你，商品规格参数配置提交成功',
                        type: 'success'
                     });
                     this.innerVisible = false;
                     this.outerVisible = false;
                     this.dynamicValidateForm.grounps=[];
                     this.isDis = true;
                     this.$parent.http(1)
                 }else{
                     this.$message.error('商品规格参数配置提交出错')
                 }
            })
          } else {
            this.$message.error('商品规格参数配置提交出错');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(index) { 
          this.dynamicValidateForm.grounps.splice(index, 1)
      },
      removechildDomain(index,i){
          this.dynamicValidateForm.grounps[index].children.splice(i, 1)
      },
      addDomain() {
        this.dynamicValidateForm.grounps.push({
          value: '',
          title:'',
          children:[]
        });
      },
      addChildDomain(index){
          this.dynamicValidateForm.grounps[index].children.push({
          value: '',
          title:'',
        });
      }
    }
  };
</script>

<style lang="less" scoped>
.el-input__innerz{
   width:50%;
   margin-right: 10px;
   margin-top: 10px;
}

</style>