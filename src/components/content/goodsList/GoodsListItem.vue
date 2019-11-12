<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="imgSrc" @load="imageLoad" />
    <p class="titile">{{good.title}}</p>
    <p class="text-info">
      <span class="price">￥{{good.price}}</span>
      <span class="cfav">{{good.cfav}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    // console.log(this.good);
  },
  methods: {
    imageLoad() {
      if (this.$route.path.includes("/home")) {
        this.$bus.$emit("itemImageLoad");
      } else if(this.$route.path.includes("/details")) {
        this.$bus.$emit("detailImageLoad");
      }else{
        this.$bus.$emit("categoryImageLoad");
      }
    },
    itemClick() {
      if (this.$route.path.includes("/home")||this.$route.path.includes("/category")) {
        this.$router.push({
          name: "details",
          params: {
            Id: this.good.iid || this.good.item_id
          }
        });
      } 
      else {
        window.location.href = this.good.item_url;
      }
    }
  },
  computed: {
    imgSrc() {
      //  if(this.good.show){
      //    return this.good.show.img
      //  }
      //  return this.good.image
      return this.good.image || this.good.img ||this.good.show.img;
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  width: 48%;
  /* height:312px; */
  font-size: 12px;
}
.goods-list-item img {
  width: 100%;
  display: block;
  border-radius: 5px;
  margin-bottom: 10px;
}
.goods-list-item .titile {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-list-item .text-info {
  text-align: center;
  padding-bottom: 10px;
  padding-top: 3px;
}
.goods-list-item .price {
  color: var(--color-tint);
  margin-right: 3px;
}
.goods-list-item .cfav {
  padding-left: 14px;
  position: relative;
}
.goods-list-item .cfav::before {
  position: absolute;
  display: block;
  content: "";
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  top: -1px;
  left: 0;
}
</style>