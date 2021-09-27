export default (_context, inject) => {
  inject('test', (msg) => console.log(msg))
  inject('common', CommonFunction)
}

const CommonFunction = {
  genIdPost() {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },

  formatDateDay(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(date).toLocaleDateString('vi', options)
  },
}
