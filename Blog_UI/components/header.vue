<template>
  <div id="header" class="header">
    <div class="logo_img">
      <a href="/blog">
        <img src="@/assets/images/logo.png" alt="" srcset="" class="logo"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      logo: 'DEV BLOG',
    }
  },
  methods: {
    goToRoute(route) {
      console.log('gotoHome')
      window.location.href = route
    },
  },
}
</script>

<style>
.header {
  background-color: #007cc2;
  z-index: 1000;
  height: 60px;
  width: 100%;
}

.logo_img {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.sticky + .page-content {
  padding-top: 120px;
}
.header-content {
  margin: 0 auto;
}

.logo {
  height: 100%;
  width: auto;
}

.right-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.right-menu .search {
  width: 60%;
}

.right-menu .ava {
  padding: 0 15px;
}
</style>
