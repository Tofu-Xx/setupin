class Carrier<K, V> extends Map<K, V> {
  newly(tag: K, content: V) {
    if (this.has(tag)) {
      return false
    }
    this.set(tag, content)
    return true
  }
}

export const carrier = new Carrier<ROOT_TAG, string>()
