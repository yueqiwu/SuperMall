const storage = window.localStorage;

export default {
  set(key, val) {
    if (val === undefined) {
      return;
    }
    storage.setItem(key, serialize(val));
  },
  get(key, def) {//def是默认值
    const val = deserialize(storage.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key) {
    storage.removeItem(key);
  },
  clear() {
    storage.clear();
  }
};

function serialize(val) {
  return JSON.stringify(val); //将 JavaScript 对象转换为字符串。
}

function deserialize(val) {
  if (typeof val !== 'string') {//将数据转换为 JavaScript 对象。
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}
