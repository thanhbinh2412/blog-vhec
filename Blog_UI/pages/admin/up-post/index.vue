<template>
  <div class="container new-post">
    <label for="">Tiêu đề<span class="e-cl">*</span></label>
    <div class="row">
      <el-input v-model="inputTitle" placeholder="Nhập tiêu đề"></el-input>
    </div>
    <el-upload
      ref="upload"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- Tag -->
    <div class="row" style="margin-top: 15px">
      <div class="col-md-10">
        <div class="wrapper-tag">
          <el-tag
            v-for="(tag, index) in dynamicTags"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            size="mini"
            class="input-new-tag"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            :disabled="disableNewTag"
            @click="showInput"
            >+ New Tag</el-button
          >
        </div>
      </div>
      <div class="col-md-2">
        <el-dropdown trigger="click">
          <div class="wrapper-tag">
            <span>Lưu</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown-save-post">
            <div class="wrapper-dropdown">
              <!-- dropdown -->
              <div class="dropdown-title">
                <span class="text-title">Xuất bản bài viết</span>
              </div>
              <div class="divider-cus"></div>
              <div class="row">
                <div class="sized-box-10"></div>
                <el-radio v-model="radio" label="1">Công khai</el-radio>
                <div class="sized-box-10"></div>
                <el-radio v-model="radio" label="0">Không công khai</el-radio>
                <div class="sized-box-10"></div>
              </div>
              <div class="divider-cus"></div>
              <!-- type description -->
              <div class="radio-des">
                <span v-if="radio == '0'">
                  <b-icon icon="globe2" class="grey-color"></b-icon>
                  Mọi người có thể thấy post</span
                >
                <span v-if="radio == '1'">
                  <b-icon icon="eye-slash-fill" class="grey-color"></b-icon>
                  Chỉ những người có liên kết đến post này, mới có thể xem
                  được</span
                >
              </div>
              <span v-if="inputTitle == ''" class="e-cl"
                >* Vui lòng nhập tiêu đề</span
              >
              <div v-if="inputTitle == ''" class="sized-box-10"></div>
              <div class="btn-save">
                <el-button
                  type="success"
                  :disabled="inputTitle == ''"
                  @click="eventPost()"
                  >{{ btnText }}</el-button
                >
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="sized-box-15"></div>
    <!-- Editor -->
    <div class="editor">
      <Tiptap v-model="contentPost"></Tiptap>
      <!-- <Tiptap @changeContent="changeContent"></Tiptap> -->
    </div>
  </div>
</template>

<script>
import {
  getPostById,
  savePost,
  updatePostById,
  saveImage,
} from '~/services/post-service'
export default {
  layout: 'empty',
  async asyncData({ query }) {
    const slug = query.id
    if (slug === '') {
      const data = {
        isEdit: false,
        dt: {},
      }
      return { data }
    } else {
      const dt = await getPostById(slug)
      const rs = dt.data.data[0]
      const data = {
        isEdit: true,
        dt: rs,
      }
      return { data }
    }
  },
  data() {
    return {
      hi: '',
      inputTitle: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      disableNewTag: false,
      radio: '0',
      contentPost: '',
      btnText: 'Đăng bài',
      id_post: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      image: {
        name: '',
        url: '',
      },
      isImage: true,
      fileList: [],
    }
  },
  mounted() {
    if (this.data.isEdit) {
      if (this.data.dt.image === '') {
        this.urlImage = false
      }
      this.inputTitle = this.data.dt.title || ''
      this.dynamicTags = this.data.dt.tag.split('%') || []
      this.radio = '1' || '0'
      this.btnText = 'Lưu thay đổi'
      this.contentPost = this.data.dt.body || ''
      this.id_post = this.data.dt.id_post || ''
      this.image.url =
        `http://localhost:3000/images/${this.data.dt.image}` || ''
      this.image.name = this.data.dt.image || ''
      this.fileList.push({
        name: this.image.name,
        url: this.image.url,
      })
    }
  },
  methods: {
    // upload image
    handleRemove(_file) {
      this.$refs.upload.clearFiles()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changeContent(newVal) {
      this.contentPost = newVal
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      if (this.dynamicTags.length < 3) {
        this.disableNewTag = false
      }
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      if (this.dynamicTags.length === 3) {
        this.disableNewTag = true
      } else {
        const inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    },
    genMaPost() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text.toUpperCase()
    },
    saveImage() {
      const formData = new FormData()
      formData.append('image', this.$refs.upload.uploadFiles[0].raw)

      return formData
    },
    async eventPost() {
      if (this.data.isEdit) {
        // const fd = await this.saveImage()
        // const dt = await saveImage(fd)
        // if (dt.data.code === 0) {
        //   // show messge thanh cong
        //   this.$message({
        //     message: 'Lưu ảnh thành công',
        //     type: 'success',
        //   })
        // } else {
        //   // show messge loi
        //   this.$message.error('Có lỗi xảy ra')
        // }
        this.savePost(this.image.name)
      } else {
        const fd = await this.saveImage()
        const dt = await saveImage(fd)
        if (dt.data.code === 0) {
          // show messge thanh cong
          this.$message({
            message: 'Lưu ảnh thành công',
            type: 'success',
          })
        } else {
          // show messge loi
          this.$message.error('Có lỗi xảy ra')
        }
        this.newPost(dt.data.data.filename)
      }
    },
    async savePost(imageName) {
      const dt = await updatePostById({
        id_post: this.id_post,
        title: this.inputTitle,
        body: this.contentPost,
        is_public: parseInt(this.radio),
        image: imageName,
      })

      if (dt.data.code === 0) {
        // show messge thanh cong
        this.$message({
          message: 'Lưu bài viết thành công',
          type: 'success',
        })
        Object.assign(this.$data, this.$options.data())
      } else {
        // show messge loi
        this.$message.error('Có lỗi xảy ra')
      }
    },
    async newPost(imageNameThun) {
      const maPost = this.genMaPost()

      const subSlug = this.inputTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replaceAll('?', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll(' ', '-')

      const req = {
        id_user: 5,
        title: this.inputTitle,
        slug: `${subSlug}-${maPost}`,
        body: this.contentPost,
        tag: `${this.dynamicTags[0]}%${this.dynamicTags[1]}%${this.dynamicTags[0]}`,
        is_public: parseInt(this.radio),
        image: imageNameThun,
      }
      const dt = await savePost(req)
      const status = dt.data.code

      if (status === 0) {
        // show messge thanh cong
        this.$message({
          message: 'Tạo bài viết thành công',
          type: 'success',
        })
        Object.assign(this.$data, this.$options.data())
      } else {
        // show messge loi
        this.$message.error('Có lỗi xảy ra')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.wrapper-tag {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 4px;
}
.el-dropdown {
  width: 100%;
}

.dropdown-save-post {
  width: 300px;
  left: 1096px;

  .wrapper-dropdown {
    width: 90%;
    margin: 0 auto;
    .dropdown-title {
      text-align: center;
    }
    .radio-des {
      margin-bottom: 10px;
      span {
        font-size: 13px;
      }
    }
  }
}
.hideUpload > div {
  display: none;
}
</style>
