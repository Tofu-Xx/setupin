class ExMap<K, V> extends Map<K, V> {
  newly(tag: K, content: V) {
    if (this.has(tag)) {
      return false
    }
    this.set(tag, content)
    return true
  }
}

export const carrier = new ExMap<ROOT_TAG, Maybe<Element>>()
export type Carrier = typeof carrier
