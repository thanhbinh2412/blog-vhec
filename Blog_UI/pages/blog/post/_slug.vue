<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto border-bottom">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/blog' }"
            ><i
              class="el-icon-s-home text-c-main"
              style="margin-right: 10px"
            ></i
            >Home</el-breadcrumb-item
          >
          <el-breadcrumb-item
            ><a :href="`/blog/post/${data.slug}`">{{
              data.title
            }}</a></el-breadcrumb-item
          >
        </el-breadcrumb>
        <div class="news-headlines-area">
          <div class="headlines">
            <h1>{{ data.title }}</h1>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="report-time mb-3">
                <span
                  >Đăng bởi {{ data.publisher }} |
                  {{ formatDateDay(data.created_at) }}</span
                >
              </div>
            </div>
            <div class="col-md-6 d-md-flex flex-md-row-reverse mb-sm-4 mb-4">
              <ShareNetwork
                network="LinkedIn"
                :title="data.title"
                :url="`http://192.168.0.103:8080/blog/post/${data.slug}`"
                :quote="`VHEC Blog: ${data.title}`"
              >
                <b-icon icon="linkedin" font-scale="1.5"></b-icon>
              </ShareNetwork>

              <ShareNetwork
                network="facebook"
                :url="`http://192.168.0.103:8080/blog/post/${data.slug}`"
                :title="data.title"
                :quote="`VHEC Blog: ${data.title}`"
                hashtags="vhec, vhec-blog"
              >
                <b-icon icon="facebook" font-scale="1.5"></b-icon>
              </ShareNetwork>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 mb-3">
      <div class="col-md-8 mx-auto">
        <div>
          <img
            class="img-responsive"
            :src="`http://localhost:3000/images/${data.image}`"
            alt=""
            srcset=""
            width="100%"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="news-full-content mb-40" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById } from '~/services/post-service'
import Prism from '~/plugins/prismjs'
export default {
  async asyncData({ params }) {
    const slug = params.slug.split('-').reverse()[0]
    const dt = await getPostById(slug)
    const data = dt.data.data[0]
    return { data }
  },
  data() {
    return {
      slug_text: '',
      des: '',
      html: '',
    }
  },
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
        {
          property: 'og:image',
          content: `http://localhost:3000/images/${this.data.image}`,
        },
      ],
    }
  },
  mounted() {
    Prism.highlightAll()
    this.strip(this.data.body)
    const el = new DOMParser().parseFromString(this.data.body, 'text/html')
    const imgs = el.getElementsByTagName('img')

    imgs.forEach((element) => {
      element.setAttribute('width', '100%')
      element.setAttribute('height', '100%')
      element.outerHTML =
        '<div class="row"> <div class="col-md-12 mx-auto">' +
        element.outerHTML +
        '</div></div>'
    })
    console.log(el.body.innerHTML)
    this.html = el.body.innerHTML
  },
  methods: {
    getTitlePost() {},
    formatDateDay(date) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(date).toLocaleDateString('vi', options)
    },
    strip(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      this.des = doc.body.textContent
      return doc.body.textContent || ''
    },
  },
}
</script>

<style lang="scss">
.report-time span {
  color: #8e8c8c;
  font-size: 13px;
}

.share-network-linkedin {
  margin-left: 15px;
  color: #06b0d8;
}
.share-network-facebook {
  margin-left: 15px;
}
</style>
