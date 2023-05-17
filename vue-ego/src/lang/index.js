import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import english from './english'
import chinese from './chinese'


Vue.use(VueI18n)

//准备语言
const messages = {
    //英文
    en:{
        ...english,
        ...enLocale
    },
    //中文
    zh:{
        ...chinese,
        ...zhLocale
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
  })
  
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})

export default i18n
