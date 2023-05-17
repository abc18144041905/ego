<template>
  <div>
    <div class="login-box">
       <h3 class="title">登录界面</h3>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="40px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import {mapMutations} from 'vuex'
export default {
     data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }
      };
      return {
        loginForm: {
          password: '',
          username: '',
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,password} = this.loginForm
            this.$api.getLogin({
              username,password
            }).then(res=>{
              if(res.data.status===200){
                  //存vuex
                  let obj = {
                    user:jwt(res.data.data).username,
                    token:res.data.data
                  }
                  this.setUser(obj)
                  //存本地
                  localStorage.setItem('user',JSON.stringify(obj))
                  //跳转网页
                  this.$router.push('/')
                  //储存信息 跳转网页 显示用户信息
                  this.$message({
                    message: '恭喜你，登录成功',
                    type: 'success'
                  });
              }else{
                //账号或密码错误
                this.$message.error('账号或密码错误');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" scoped>
.login-box{
  width: 400px;
  padding: 20px;
  
  margin: 250px auto;
  border-radius: 10px;
  border:#eee solid 1px;
  background: #fff;
  }
  .title{
    margin-bottom: 20px;
    text-align:center;
    color: #666;
  }
</style>