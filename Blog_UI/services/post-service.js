import ConnectionInstance from '~/plugins/connection'

export const getListPost = () => {
  return ConnectionInstance.get('/post/danh-sach')
}

export const savePost = (req) => {
  return ConnectionInstance.post('/post/new-post', {
    id_user: req.id_user,
    title: req.title,
    slug: req.slug,
    body: req.body,
    tag: req.tag,
    is_public: req.is_public,
    image: req.image,
  })
}

export const getPostById = (maPost) => {
  return ConnectionInstance.get(`/post/${maPost}`)
}

export const updatePostById = (req) => {
  return ConnectionInstance.put('/post/update', {
    id_post: req.id_post,
    title: req.title,
    body: req.body,
    is_public: req.is_public,
    image: req.image,
  })
}

export const deletePostById = (id) => {
  return ConnectionInstance.delete(`/post/delete/${id}`)
}

export const saveImage = (fd) => {
  return ConnectionInstance.post(`/images`, fd, {
    'Content-Type': 'multipart/form-data',
  })
}
