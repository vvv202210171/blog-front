export default {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return false
  },
  remove(key) {
    window.localStorage.setItem(key, '')
  },
  clear() {
    window.localStorage.clear()
  }
}
