<template>
  <div class="add_goods">
      <div class="title">
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{nogg==0 ? '添加商品':'编辑商品'}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="myform">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="类目选择" prop="category">
                 <el-button type="primary" @click="dialogVisible = true">类目选择</el-button>
                 <span style="margin-left:20px">{{ruleForm.category}}</span>
                  <el-dialog
                    title="类目选择"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="handleClose">
                    <span>
                      
                      <tree-goods @sendTreeData="sendTreeData"></tree-goods>
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="showTreeData">确 定</el-button>
                    </span>
                  </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" required>
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="ruleForm.sellPoint"></el-input>
            </el-form-item>




            <el-form-item label="商品图片" prop="image">
                <el-button type="primary" @click="dialogVisibleImg = true">上传图片</el-button>
                <img style="height:40px;margin-left:10px" :src="ruleForm.image" alt="">
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisibleImg"
                  width="40%"
                  :before-close="handleCloseImg">
                  <up-load @sendImg="sendImg"></up-load>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleImg = false">取 消</el-button>
                    <el-button type="primary" @click="showImg">确 定</el-button>
                  </span>
                </el-dialog>
            </el-form-item>
          <el-form-item label="商品描述" prop="descs">
                <wang-editor ref="Edi" @textcontent="textcontent"></wang-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{nogg==0?'立即添加':'提交修改'}}</el-button>
                <el-button v-if="nogg==0" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
      </div>
  </div>

</template>

<script>
import TreeGoods from './treegoods.vue'
import upLoad from './upload.vue'
import wangEditor from './wangeditor.vue'
export default {
  components:{
     TreeGoods,
     upLoad,
     wangEditor
  },
    data() {
      return {
        picUrl:'',
        treeData:{},
        ruleForm: {
          id:'',
          title: '',
          cid:'',//类目id
          price: '',
          num: '',
          sellPoint: '',
          image:'',
          category:'',
          descs:'',
          date1:'',
          date2:''  
        },
        rules: {  //校验规则
          title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入商品数量', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          
        },
        dialogVisibleImg: false,
        dialogVisible: false
      };
    },
    computed:{
        nogg(){
          return this.$route.query.msgtitle
        }
    },
    methods: {
      textcontent(text){
           this.ruleForm.descs = text
      },
      showImg(){
        this.dialogVisibleImg = false
        this.ruleForm.image = this.picUrl
      },
      sendImg(url){
          this.picUrl = url
      },
      //弹框点击确定，数据显示
      showTreeData(){
          this.dialogVisible = false;
          this.ruleForm.category = this.treeData.name
          this.ruleForm.cid = this.treeData.cid
          
      },
      //接受子组件树形条目
      sendTreeData(data){
         this.treeData = data
      },
      //弹框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_)
            done();
          })
          .catch(_ => {
            console.log(_)
          });
      },
      handleCloseImg(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_)
            done();
          })
          .catch(_ => {
            console.log(_)
          });
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.nogg == 1){
               console.log('正在修改数据')
               //参数：id title cid  category sellPoint price num descs paramsInfo image
              let {id, title, cid,  category, sellPoint, price, num, descs, image} = this.ruleForm
              this.$api.changGoods({
                id, title, cid,  category, sellPoint, price, num, descs, image
              }).then(res=>{
                if(res.data.status === 200){
                    this.$router.push({path:'/goods'})
                    this.$message({
                      message: '编辑商品成功',
                      type: 'success'
                    });
                }else{
                  this.$message.error('添加出错');
                }
              })


            }else{
               //参数： title cid  category sellPoint price num descs paramsInfo image
              let {title, cid,  category, sellPoint, price, num, descs, image} = this.ruleForm
              this.$api.addGoods({
                title, cid,  category, sellPoint, price, num, descs, image
              }).then(res=>{
                if(res.data.status === 200){
                    this.$router.push({path:'/goods'})
                    this.$message({
                      message: '添加商品成功',
                      type: 'success'
                    });
                }else{
                  this.$message.error('添加出错');
                }
              })
            }
         } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
         this.$refs.Edi.editor.txt.clear()
      }
    },
    mounted(){
      if(this.$route.query.row){
          this.ruleForm = this.$route.query.row
         // 设置富文本编译器
         this.$refs.Edi.editor.txt.html(this.ruleForm.descs)
      }
        
    }
  }
</script>

<style lang="less" scoped>
   .title{
     
       padding: 10px;
       background-color:#fff;
       border: #eee solid 1px;
   }
   .add_goods{
       margin: 10px;
       
   }
   .myform{
       padding-right: 30px;
       padding-top: 20px;
       margin-top: 10px;
       background: #fff;
       padding-bottom: 20px;
   }
   .line{
       text-align: center;
   }
</style>