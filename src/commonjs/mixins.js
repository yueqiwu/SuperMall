import BackTop from "components/content/backTop/BackTop";
import storage from "commonjs/storage";


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}

// 搜索页 点击保存历史记录
export const searchMixin = {
  methods: {
    $_selectItem(hotWord) {
      let content = storage.get("superMall_search_hotWords", []);
      if (content.length !== 0) {
        content = content.filter(item => item !== hotWord);
      }
      content.unshift(hotWord);
      storage.set("superMall_search_hotWords", content);
      this.$bus.$emit('updataHistory')
      location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${hotWord}`;
    }
  }
}