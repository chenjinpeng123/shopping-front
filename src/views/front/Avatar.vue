<template>
  <el-upload
      name="file"
      class="upload-demo"
      ref="upload"
      action="http://localhost:8084/user/uploadPicture"
      :data="{userId:$store.state.userId}"
      :on-preview="handlePreview"
      :on-success="success"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取一张图片</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    success(response) {
      alert("上传成功")
      this.$store.commit("changeAvatarUrl",response.data)
      this.$router.push('/')
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {

    },
    handlePreview(file) {

    }
  }
}
</script>