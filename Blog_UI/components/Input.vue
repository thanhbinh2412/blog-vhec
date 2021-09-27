<template>
  <div class="cus-input">
    <label for="">{{ label }}</label>
    <div class="row">
      <el-input v-model="input" :placeholder="placeholder"></el-input>
    </div>
    <!-- Tag -->
    <div class="row">
      <div class="col-md-10">
        <div class="wrapper-tag">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
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
          <el-dropdown-menu slot="dropdown">
            <!-- dropdown -->
            <p>Xuất bản bài viết</p>
            <div class="dropdown-divider"></div>
            <div class="row">
              <el-radio v-model="radio" label="0">Công khai</el-radio>
              <el-radio v-model="radio" label="1">Không công khai</el-radio>
            </div>
            <div class="row">
              <div class="col-6">
                <el-button type="success">Success</el-button>
              </div>
              <div class="col-6">
                <el-button type="info">Info</el-button>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    placeholder: String,
  },
  data() {
    return {
      input: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      disableNewTag: false,
      radio: '0',
    }
  },
  watch: {
    input(newVal) {
      this.$emit('inputed', newVal)
    },
  },
  methods: {
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
  },
}
</script>

<style scoped>
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
</style>
