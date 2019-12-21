<template>
  <div class="category">
    <nav-bar class="navBar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="category-wrap ignore" ref="wrap">
      <menu-list :menuList="menuList" @itemClick="menuItemClick" />
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <sub-category :categoryList="subCategory" @imageLoad="refreshScroll" />
        <tab-control :titles="['综合','新品','销量']" @itemClick="tabItemClick" />
        <goods-list :goodsList="categoryDetails" />
      </scroll>
    </div>
    <transition name="backTop">
      <back-top @click.native="backTop" v-show="isBackTopShow" />
    </transition>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";

import MenuList from "./childComps/Menu";
import SubCategory from "./childComps/SubCategory";

import {
  getMenu,
  getSubCategory,
  getCategoryDetails
} from "network/category.js";
import { debounce } from "commonjs/utils";
import { backTopMixin } from "commonjs/mixins";
import storage from "commonjs/storage";
import {
  SUPERMALL_SUB_CATEGORY,
  CATEGORY_CONTENT_UPDATE_TIME_INTERVAL
} from "./config";

export default {
  name: "Category",
  components: {
    NavBar,
    MenuList,
    SubCategory,
    scroll,
    TabControl,
    GoodsList
  },
  data() {
    return {
      menuList: [],
      subCategory: [],
      categoryDetails: [],
      currentType: "pop",
      miniWallkey: null
    };
  },
  mixins: [backTopMixin],
  created() {
    this._getMenu().then(res => {
      //一定是先获取menu内容后在获取具体内容
      this._getSubCategory(res[0].maitKey);
      this._getCategoryDetails(res[0].miniWallkey, this.currentType);
      this.miniWallkey = res[0].miniWallkey;
      this.maitKey = res[0].maitKey;
    });
  },
  mounted() {
    // 1.监听goodslistitem中图片的加载完成
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("categoryImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件触发
     */
    menuItemClick(index, maitKey, miniWallkey) {
      //数据清空 组件重载
      this.subCategory = [];
      this.categoryDetails = [];

      //发送请求 获取数据
      this.miniWallkey = miniWallkey;
      this._getSubCategory(maitKey);
      this._getCategoryDetails(miniWallkey, this.currentType);
      //保证每次点击滚动条都在顶部
      this.$refs.scroll.scrollTo(0, 0, 0);
    },
    refreshScroll() {
      this.$refs.scroll.refresh();
    },
    contentScroll(position) {
      this.isBackTopShow = -position.y > this.$refs.wrap.offsetHeight;
    },
    tabItemClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.categoryDetails.length = 0;
      this.goodsListKey = Math.random();
      this._getCategoryDetails(this.miniWallkey, this.currentType);
    },
    /**
     * axios请求
     */
    _getMenu() {
      return new Promise((resolve, reject) => {
        // 先从本地缓存中获得数据
        const content = storage.get(SUPERMALL_SUB_CATEGORY);
        const currentTime = new Date().getTime();
        if (content && content.menu) {
          if (
            currentTime - content.saveTime >=
            CATEGORY_CONTENT_UPDATE_TIME_INTERVAL
          ) {
            getMenu().then(res => {
              this.menuList = res.data.category.list;
              this.updateLocalStorage(SUPERMALL_SUB_CATEGORY, content, 'menu', res.data.category.list)
              resolve(res.data.category.list);
            });
          } else {
            this.menuList = content.menu.data;
            resolve(content.menu.data);
          }
        }else{
           getMenu().then(res => {
              this.menuList = res.data.category.list;
              this.updateLocalStorage(SUPERMALL_SUB_CATEGORY, content, 'menu', res.data.category.list)
              resolve(res.data.category.list);
            });
        }
      });
    },
    _getSubCategory(maitKey) {
      // console.log(storage)
      // 先从本地缓存中获得数据
      const content = storage.get(SUPERMALL_SUB_CATEGORY);
      const currentTime = new Date().getTime();
      if (content && content[maitKey]) {
        if (
          // 本地缓存中有数据但是超过时限 重新网络请求
          currentTime - content[maitKey].saveTime >=
          CATEGORY_CONTENT_UPDATE_TIME_INTERVAL
        ) {
          return getSubCategory(maitKey).then(res => {
            this.subCategory = res ? res.data.list : []; //快速点击 取消前一次操作时可能会返回undifined 所以做一次默认值
            this.updateLocalStorage(
              SUPERMALL_SUB_CATEGORY,
              content,
              maitKey,
              res.data.list
            );
          });
        } else {
          // 本地缓存中有数据并且没有超过时限
          this.subCategory = content[maitKey].data;
        }
      } else {
        // 本地缓存中没有数据 网络请求
        return getSubCategory(maitKey).then(res => {
          this.subCategory = res ? res.data.list : []; //快速点击 取消前一次操作时可能会返回undifined 所以做一次默认值
          this.updateLocalStorage(
            SUPERMALL_SUB_CATEGORY,
            content,
            maitKey,
            res.data.list
          );
        });
      }
    },
    _getCategoryDetails(miniWallkey, type) {
      return getCategoryDetails(miniWallkey, type).then(res => {
        this.categoryDetails = res || [];
        // console.log(res);
      });
    },
    // 更新localStorage
    updateLocalStorage(key, content, id, data) {
      content = content || {};
      content[id] = content[id] || {};
      content[id].saveTime = new Date().getTime();
      content[id].data = data;
      storage.set(key, content);
    }
  }
};
</script>

<style scoped>
.category {
  height: 100%;
  width: 100%;
  position: relative;
}
.navBar {
  background-color: var(--color-tint);
  color: #fff;
}

.category-wrap.ignore {
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 0px;
  display: flex;
}
.menu {
  width: 100px;
  height: 100%;
  flex-shrink: 0;
}
.content {
  flex: 1;
  padding: 0px 8px;
  overflow: hidden;
}
.backTop-leave-active,
.backTop-enter-active {
  transition: opacity 0.5s;
}
.backTop-leave-to,
.backTop-enter {
  opacity: 0;
}
</style>