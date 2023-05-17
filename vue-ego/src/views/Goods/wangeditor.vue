<template>
  <div>
      <div id="wangeditor">
      </div>
  </div>
</template>

<script>
//富文本编辑器
import E from 'wangeditor'
export default {
    data(){
        return{
            editor:''
        }
    },
    mounted(){
       this.editor = new E('#wangeditor')
       // 配置菜单栏，删减菜单，调整顺序
        this.editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'todo',
            'justify',
            'quote',
            'emoticon',
            'image',
            'video',
            'table',
            'code',
            'splitLine',
            'undo',
            'redo',
        ]
        // 取消自动 focus
        this.editor.config.focus = false
       // 配置 onchange 回调函数
        this.editor.config.onchange = newHtml => {
               this.$emit("textcontent",newHtml)
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 500; // 修改为 500ms
       this.editor.create()
    //    editor.txt.html()
    //    editor.txt.clear()
    //    editor.config.menus
    }
}
</script>

<style>
 .w-e-menu{
     z-index: 1 !important;
 }
 .w-e-toolbar{
     z-index: 2 !important;
 }
 .w-e-text-container{
     z-index: 1 !important;
 }
</style>