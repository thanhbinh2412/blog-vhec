<template>
  <div class="admin-list-post">
    <el-table
      :data="
        dtTb.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column fixed type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="title" label="Tiêu đề" width="300">
      </el-table-column>
      <el-table-column prop="publisher" label="Người đăng" width="120">
      </el-table-column>
      <el-table-column prop="time" label="Thời gian" width="190">
      </el-table-column>
      <el-table-column prop="status" label="Trạng thái" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">
            <b-icon icon="globe2" class="grey-color"></b-icon>
            Public</span
          >
          <span v-if="scope.row.status == 0">
            <b-icon icon="eye-slash-fill" class="grey-color"></b-icon>
            Private</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="220">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row.slug)"
            >Chi tiết</el-button
          >
          <el-button type="text" size="small">
            <nuxt-link
              :to="{ path: '/admin/up-post', query: { id: scope.row.id } }"
              >Chỉnh sửa</nuxt-link
            >
          </el-button>
          <el-popconfirm
            confirm-button-text="Xoá"
            cancel-button-text="Huỷ"
            title="Bạn muốn xoá bài viết?"
            icon="el-icon-info"
            icon-color="red"
            @confirm="deletePost(scope.row.id_post)"
          >
            <el-button slot="reference" type="text" size="small">Xoá</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListPost, deletePostById } from '~/services/post-service'
export default {
  layout: 'empty',
  async asyncData() {
    const dt = await getListPost()
    const data = dt.data.data
    return { data }
  },
  data() {
    return {
      activeIndex: '2',
      search: '',
      dtTb: [],
    }
  },
  mounted() {
    // process data

    this.data.forEach((element) => {
      const tmp = {
        id_post: element.id_post,
        id: element.ma_post,
        title: element.title,
        publisher: 'Admin',
        time: this.$common.formatDateDay(element.created_at),
        tag: element.tag,
        status: element.is_public,
        slug: element.slug,
      }
      this.dtTb.push(tmp)
    })
  },
  methods: {
    indexMethod(index) {
      return index
    },
    handleClick(url) {
      window.open(`http://localhost:8080/blog/post/${url}`, '_blank')
    },
    async deletePost(id) {
      const dt = await deletePostById(id)
      if (dt.data.code === 0) {
        this.$message({
          message: 'Xoá bài vết thành công',
          type: 'success',
        })
        location.reload()
      } else {
        this.$message.error('Đã xảy ra lỗi')
      }
    },
  },
}
</script>

<style></style>
