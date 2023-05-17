//接口路径配置

const base = {
    host:'http://localhost:8989/',//基础域名
    goodsList:'/api/projectList', //商品列表
    searchn:'/api/search',//搜索
    selectcategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    // itemcategory:'/api/category/data' //类目结构数据
    uploadUrl:'/api/upload',//图片上传post请求
    addgoods:'/api/backend/item/insertTbItem',//添加商品
    deletegoods:'/api/backend/item/deleteItemById',//删除商品
    changgoods:'/api/backend/item/updateTbItem',//修改商品
    deleteallgoods:'/api/batchDelete', //批量删除商品
    login:'/api/login',//登录
    params:'/api/backend/itemParam/selectItemParamAll',//规格参数列表
    itemparams:'/api/backend/itemParam/insertItemParam'//规格参数添加
}

export default base;