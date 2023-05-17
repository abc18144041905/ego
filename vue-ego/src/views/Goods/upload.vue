<template>
  <div>
      <el-upload
        :on-success="nUpload"
        class="upload-demo"
        ref="upload"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
  </div>
</template>

<script>
import base from '../../api/base'
export default {
    data() {
      return {
        url:base.uploadUrl,
        fileList: []
      };
    },
    methods: {
      nUpload(response){
            
            this.$message({
            message: '恭喜你，上传图片成功',
            type: 'success'
            });
            let imgUrl = base.host + response.url.slice(7)
            this.$emit('sendImg',imgUrl)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }

}
</script>

<style>

</style>