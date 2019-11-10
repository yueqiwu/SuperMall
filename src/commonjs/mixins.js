import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isBackTopShow: false,
    }
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}