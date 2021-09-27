<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside :width="!isCollapse ? '200px' : '70px'">
        <el-menu
          :default-active="indexTab"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <NuxtLink to="/admin/site-admin">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">Bài viết</span>
            </el-menu-item>
          </NuxtLink>
          <NuxtLink :to="{ path: '/admin/up-post', query: { id: '' } }">
            <el-menu-item index="2">
              <i class="el-icon-edit"></i>
              <span slot="title">Tạo bài viết mới</span>
            </el-menu-item>
          </NuxtLink>
        </el-menu>
      </el-aside>
      <el-main><nuxt></nuxt></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      widthSide: '200px',
      indexTab: '1',
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style></style>
