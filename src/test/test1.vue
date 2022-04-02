<template>
  <el-form-item>
    <el-upload
        class="upload-demo"
        action="http://localhost:8084/good/uploadPic"
        :on-remove="handleRemove"
        :data="{groupId:3}"
        :limit="5"
        multiple
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb和5张图片</div>
    </el-upload>
  </el-form-item>

  <el-form-item>
    <el-upload
        class="upload-demo"
        action="http://localhost:8084/good/uploadPic"
        :on-remove="handleRemove"
        :data="{groupId:3}"
        :limit="5"
        multiple
        :file-list="fileListTwo">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb和5张图片</div>
    </el-upload>
  </el-form-item>

</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      fileListTwo: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      fileList.some((item,i) => {
        if (item.uid === file.uid) {
          fileList.splice(i, 1)
          return true;
        }
      })
      console.log(fileList)
    }
  }
}
</script>