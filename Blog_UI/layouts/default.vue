<template>
  <div class="wrapper">
    <Header />
    <Nuxt class="page-content mt-5" />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/footer.vue'
import Header from '~/components/header.vue'
export default {
  components: { Header, Footer },
  data() {
    return {
      isCollapse: false,
      width: '70px',
    }
  },
  mounted() {
    console.log('hihi')
    const header = document.getElementById('header')
    const sticky = header.offsetTop
    window.onscroll = function () {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
  },
  methods: {},
}
</script>

<style>
.page-content {
}
</style>
