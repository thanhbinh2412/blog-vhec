<template>
  <div class="container list-post">
    <!-- <div class="row">
      <div class="col-md-8">
        <ItemPost
          v-for="(i, index) in lstPost"
          :key="index"
          publisher="Admin"
          :post-title="i.title"
          :post-slug="i.slug"
          @click="detailPost()"
        ></ItemPost>
      </div>
      <div class="col-md-4">
        <el-divider content-position="center">Chủ đề</el-divider>
      </div>
    </div> -->
    <div class="recent-post-area">
      <div class="recent-post-title row col-md-10 m-auto">
        <div class="d-flex justify-content-between align-items-center">
          <div class="title-recent d-flex align-items-center">
            <h4>
              <b-icon icon="bar-chart-steps" style="color: #007cc2"></b-icon>
            </h4>
            <h4 class="color-main" style="margin-left: 10px">Mới nhất</h4>
          </div>
          <a href="#" class="link btn-more">Xem thêm</a>
        </div>
        <div class="divider-cus"></div>
      </div>
      <div class="recent-post-grid row col-md-10 m-auto">
        <div class="col-md-8 mt-3">
          <a :href="`blog/post/${lstPost[0].slug}`" class="link">
            <div class="post">
              <div class="img-post">
                <img
                  class="img-responsive"
                  src="https://vcdn1-vnexpress.vnecdn.net/2016/08/02/Blog-UY-1024x683-8016-1470134358.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=eQ-iTu5KPZtbaL8mEt5S3A"
                />
              </div>
              <div class="post-content">
                <span>{{ getDate(lstPost[0].created_at) }}</span>
                <h4>
                  {{ lstPost[0].title }}
                </h4>
              </div>
            </div></a
          >
        </div>
        <div class="col-md-4">
          <div class="row mt-3">
            <div class="col-sm-12">
              <a :href="`/blog/post/${lstPost[1].slug}`" class="link">
                <div class="post">
                  <div class="img-post">
                    <img
                      class="img-responsive"
                      src="https://vcdn1-vnexpress.vnecdn.net/2016/08/02/Blog-UY-1024x683-8016-1470134358.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=eQ-iTu5KPZtbaL8mEt5S3A"
                    />
                  </div>
                  <div class="post-content">
                    <span>{{ getDate(lstPost[0].created_at) }}</span>
                    <h4>
                      {{ lstPost[1].title }}
                    </h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="row bottom-right mt-3">
            <div class="col-sm-12">
              <a :href="`/blog/post/${lstPost[2].slug}`" class="link">
                <div class="post">
                  <div class="img-post">
                    <img
                      class="img-responsive"
                      src="https://vcdn1-vnexpress.vnecdn.net/2016/08/02/Blog-UY-1024x683-8016-1470134358.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=eQ-iTu5KPZtbaL8mEt5S3A"
                    />
                  </div>
                  <div class="post-content">
                    <span>{{ getDate(lstPost[0].created_at) }}</span>
                    <h4>
                      {{ lstPost[0].title }}
                    </h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row older-post-area col-md-10 m-auto mt-4">
      <div class="older-post-title row">
        <div class="d-flex justify-content-between align-items-center">
          <div class="title-older d-flex align-items-center">
            <h4>
              <b-icon icon="bar-chart-steps" style="color: #007cc2"></b-icon>
            </h4>
            <h4 class="color-main" style="margin-left: 10px">Bài viết</h4>
          </div>
          <a href="#" class="link btn-more">Xem thêm</a>
        </div>
        <div class="divider-cus"></div>
      </div>
      <div class="row older-post-content col-md-10 m-auto mt-5">
        <ItemPost
          v-for="(i, index) in lstPost"
          :key="index"
          publisher="Admin"
          :post-title="i.title"
          :post-slug="i.slug"
          :created-at="i.created_at"
          @click="detailPost()"
        ></ItemPost>
      </div>
    </div>
  </div>
</template>

<script>
import { getListPost } from '~/services/post-service'
import ItemPost from '~/components/post-widget/ItemPost.vue'
export default {
  components: { ItemPost },
  async asyncData() {
    const dt = await getListPost()
    const lstPost = dt.data.data
    return { lstPost }
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
.list-post {
  margin-top: 30px;
}
</style>
