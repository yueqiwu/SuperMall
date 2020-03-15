<template>
  <scroll
    scrollX
    class="shop-item-content"
    :click="false"
    :probeType="3"
    @scroll="itemScroll"
    @scrollTouchEnd = "scrollTouchEnd"
    ref="scroll"
  >
    <div class="cart-item"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              >
      <div class="shop-item">
        <div class="item-selector">
          <check-button :isChecked="itemInfo.isChecked" @btnClick="changeChecked" />
        </div>
        <div class="item-img">
          <img :src="itemInfo.imgURL" alt="商品图片" />
        </div>
        <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
          <div class="info-bottom">
            <div class="item-price left">{{itemInfo.newPrice}}</div>
            <div class="item-count right">x{{itemInfo.count}}</div>
          </div>
        </div>
      </div>
      <div class="item-del" @click="removeOrder" ref="removeOrder">删除</div>
    </div>
  </scroll>
</template>

<script>
import CheckButton from "./CheckBtn";
import scroll from "components/common/scroll/Scroll";
import { CHANGE_CHECKED, DEL_ORDER } from "store/mutation-types";
import { MessageBox } from "element-ui";

export default {
  name: "ShopCartItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      delOrderBtnWidth: 0,
      // 购物车是否回弹
      isBounce: false
      // positionX: 0
    };
  },
  // 刚进入购物车页面时 拿到删除按键的宽度 mounted不行
  activated() {
    this.$nextTick(() => {
      this.delOrderBtnWidth = this.$refs.removeOrder.offsetWidth;
    });
  },
  components: {
    CheckButton,
    scroll
  },
  methods: {
    changeChecked() {
      this.$store.commit(CHANGE_CHECKED, this.index);
    },
    removeOrder() {
      MessageBox.confirm("此操作将删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit(DEL_ORDER, this.index);
        })
        .catch(e => {
          console.log(e);
          // 恢复原位
          this.$refs.scroll.scrollTo(0, 0);
        });
    },
    itemScroll(position) {
      const positionX = position.x
      if (positionX <= 0 && -positionX < this.delOrderBtnWidth / 2) {
        this.isBounce = true;
      } else if (
        positionX <= 0 &&
        -positionX >= this.delOrderBtnWidth / 2
      ) {
        this.isBounce = false
      }
    },
    // 松手判定滑动距离 自动回弹
    scrollTouchEnd(){
      console.log('scroll')
      if(this.isBounce) {
        this.$refs.scroll.scrollTo(0, 0);
      }else{
        this.$refs.scroll.scrollTo(-this.delOrderBtnWidth, 0);
      }
    }
  }
};
</script>

<style scoped>
.shop-item-content {
  width: 100%;
  display: flex;
  /* 这个flex触发了内部 content的bfc盒子 导致content随内容宽度自适应 也就是他的宽度大于了屏幕宽 */
}
.cart-item {
  display: flex;
  width: calc(100vw + 50px);
}
.shop-item {
  width: 100vw;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
  flex: 1;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
.item-del {
  width: 50px;
  background-color: #ff4500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
