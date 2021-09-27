<template>
  <div class="item-post">
    <a :href="`/blog/post/${postSlug}`" class="link">
      <div class="row post">
        <div class="col-md-8">
          <div class="row title-post">
            <h4>{{ postTitle }}</h4>
          </div>
          <div class="row des-post">
            <p>
              Vue.js là một trong các framework JavaScript ,nó rất linh động và
              được dùng phổ biến để xây dựng các giao diện người dùng.không
              giống với các monolithic frameworks khác, Vue được thiết kế để xây
              đựng theo từng bước .Thư viện lỏi (core libary) của nó chỉ tập
              trung vào xây dựng phần view và nó dể dàng tích hợp với các thư
              viện khác hoặc project có sãn.Mặt khác , Vue hoàn toàn dủ khả năng
              cung cấp các chức năng để sây dựng một trang wep SPA(Single-Page
              Applications).
            </p>
          </div>
          <div class="tag-post">
            <el-tag type="info">Tag 3</el-tag>
            <el-tag type="info">Tag 3</el-tag>
            <el-tag type="info">Tag 3</el-tag>
          </div>
          <div class="report-time d-md-flex justify-content-end">
            <span>Đăng bởi {{ publisher }} | {{ getDate(createdAt) }}</span>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-center">
          <div class="img-post">
            <img
              src="https://vcdn1-vnexpress.vnecdn.net/2016/08/02/Blog-UY-1024x683-8016-1470134358.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=eQ-iTu5KPZtbaL8mEt5S3A"
              alt=""
              class="img-responsive"
            />
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    publisher: {
      type: String,
      default: 'Admin',
      require: true,
    },
    postTitle: {
      type: String,
      default: '',
      require: true,
    },
    postSlug: {
      type: String,
      default: '',
      require: true,
    },
    createdAt: {
      type: String,
      default: '',
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    getDate(createAt) {
      const rs = this.$common.formatDateDay(createAt)

      return rs
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-post {
  margin-bottom: 10px;
}
.title-post {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
}

.item-post {
  background-color: #f6f6f6;
  margin-bottom: 20px;
  border-radius: 10px;

  .post {
    padding: 15px 5px;
  }
}
.des-post {
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
}
</style>
