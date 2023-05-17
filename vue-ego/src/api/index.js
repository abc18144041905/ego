//请求方法
import axios from 'axios'
import base from './base'
const qs = require('querystring')
const api = {
    //商品列表
    getGoodsList(params){
        return axios.get(base.goodsList,{
            params
        })
    },
    //搜索
    getSearch(params){
        return axios.get(base.searchn,{
            params
        })
    },
    //获取类目
    getSelectCategory(params){
        return axios.get(base.selectcategory,{params})
    },
    //参数： title cid  category sellPoint price num descs paramsInfo image
    addGoods(params){
        return axios.get(base.addgoods,{
            params
        })
    },
    //删除商品
    deleteGoods(params){
        return axios.get(base.deletegoods,{
            params
        })
    },
    //修改商品changgoods
    changGoods(params){
        return axios.get(base.changgoods,{
            params
        })
    },
    //批量删除商品
    deleteAllGoods(params){
        return axios.get(base.deleteallgoods,{
            params
        })
    },
    //登录
    getLogin(params){
        return axios.post(base.login,qs.stringify(params))
    },
    //规格参数列表
    getParams(params){
        return axios.get(base.params,{
            params
        })
    },
    //规格参数添加
    itemParams(params){
        return axios.get(base.itemparams,{
            params
        })
    },
}
export default api