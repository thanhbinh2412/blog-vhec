import Axios from 'axios'
const ConnectionInstance = Axios.create({
  // headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 1000,
  baseURL: 'http://localhost:3000',
  paramsSerializer(params) {
    const searchParams = new URLSearchParams()
    for (const key of Object.keys(params)) {
      const param = params[key]
      if (param !== undefined) {
        if (Array.isArray(param)) {
          let ids = ''
          param.forEach((p, i) => {
            if (i + 1 === param.length) {
              ids += `${p}`
            } else {
              ids += `${p},`
            }
          })
          searchParams.append(key, ids)
        } else {
          searchParams.append(key, param)
        }
      }
    }
    return searchParams.toString()
  },
})

ConnectionInstance.interceptors.response.use(
  (response) => {
    console.info('API Response:', response)

    return response
  },
  (error) => {
    console.error('API Response Error:', error)
    const errorMessage = error.response.data.message
    if (errorMessage) {
      return Promise.reject(new Error(errorMessage))
    }
    return Promise.reject(error)
  }
)
export default ConnectionInstance
