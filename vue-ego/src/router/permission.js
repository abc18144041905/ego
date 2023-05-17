import router from './index'
//获取vuex信息
import store from '../store/index'
//路由拦截
router.beforeEach((to,from,next)=>{
  //判断是否需要登录
  let token = store.state.loginModule.userinfo.token;
  if (to.name == 'Login'){
    if(to.matched.some(ele => ele.meta.loginisLogin)){
          if(token){
            next('/')
          }else{
            next()
          }
    }else{
      next();
    }
  }else{
    if(to.matched.some(ele => ele.meta.isLogin)){
          if(token){
            next()
          }else{
            next('/login')
          }
    }else{
      next();
    }
  }
  
    // console.log(to)
    // console.log(from)
    
})
