<template>
  <div class="personal">
    <me-navbar class="nav-bar">
      <div class="title" slot="center">我的</div>
      <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
    <me-scroll class="content">
      <div class="personal-header">
        <div class="personal-icon">
          <i class="iconfont icon-personal" slot="right"></i>
        </div>
        <div class="re">
          <span>注册</span>
          <span>登录</span>
        </div>
      </div>
      <div class="mine-order">
        <div class="order">
          <i class="iconfont icon-home"></i>
          <p class="title">我的订单</p>
          <span>查看我的全部订单</span>
        </div>
        <div class="order-menu">
          <div
            v-for="(item,index) in orderMenuList"
            :key="index"
          >
            <i class="iconfont" :class="item.class"></i>
            <span>{{item.text}}</span>
          </div>
        </div>
      </div>
      <div class="mine-assets">
        <div class="assets">
          <i class="iconfont icon-category"></i>
          <p class="title">我的资产</p>
        </div>
        <div class="assets-menu">
          <span>现金券</span>
          <span>红包</span>
          <span>余额</span>
          <span>礼品卡</span>
        </div>
      </div>
      <div class="mine-others">
        <me-menu v-for="item in othersList" :key="item">
          <i class="iconfont icon-msg" slot="left"></i>
          <p class="title" slot="center">{{item}}</p>
          <span slot="right" class="arrow">></span>
        </me-menu>
      </div>
      <p class="phone-number">客服热线400-123-8888(8:00-22:00)</p>
      <p class="UID">拨打前请记录您的UID 0</p>
    </me-scroll>
  </div>
</template>

<script>
import MeNavbar from "components/common/navbar/NavBar";
import MeScroll from "components/common/scroll/Scroll";
import MeMenu from "./childComps/menu";
export default {
  name: "Personal",
  components: {
    MeNavbar,
    MeScroll,
    MeMenu
  },
  data(){
    return {
      othersList:['售后服务','意见反馈','收货地址','退出登录','400-123-8888'],
      orderMenuList:[{text:'待付款',class:'icon-home'},{text:'待收货',class:'icon-category'},{text:'待评价',class:'icon-msg'},{text:'退货/退款',class:'icon-category'}]
    }
  }
};
</script>

<style scoped>
.personal {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 1rem;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.personal .mine-navbar {
  background-color: #de181b;
  color: #eee;
  font-size: 16px;
}

.personal .mine-navbar .title {
  text-align: center;
}

.personal .mine-navbar .icon-msg {
  position: relative;
  font-size: 20px;
}

.personal .mine-navbar .icon-msg::after {
  font-family: "iconfont";
  display: block;
  content: "\e64c";
  position: absolute;
  top: 0;
  left: -30px;
}

.personal .personal-header {
  width: 100%;
  height: 183px;
  background-color: var(--color-tint);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.personal .personal-header .personal-icon {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.personal .personal-header .personal-icon .icon-personal {
  font-size: 30px;
  color: #f00;
}

.personal .re {
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
}

.personal .re > span:first-child {
  padding-right: 20px;
  border-right: 1px solid #fff;
}

.personal .re > span:last-child {
  padding-left: 20px;
}

.personal .mine-order {
  width: 100%;
  height: 100px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.personal .mine-order .order {
  display: flex;
  padding: 5px;
  height: 35px;
  border-bottom: 1px solid #dfdcdc;
  align-items: center;
}

.personal .mine-order .order p {
  flex: 1;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.personal .mine-order .order span {
  color: #aaa;
}

.personal .mine-order .order span::after {
  content: ">";
  font-family: "宋体";
  padding-left: 20px;
}

.personal .mine-order .order-menu {
  flex: 1;
  display: flex;
}

.personal .mine-order .order-menu div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
}

.personal .mine-order .order-menu div span {
  margin-top: 10px;
}

.personal .mine-order .order-menu div .iconfont {
  font-size: 20px;
}

.personal .mine-assets {
  width: 100%;
  height: 80px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.personal .mine-assets .assets {
  display: flex;
  padding: 5px;
  height: 35px;
  border-bottom: 1px solid #dfdcdc;
  align-items: center;
}

.personal .mine-assets .assets p {
  flex: 1;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.personal .mine-assets .assets-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.personal .mine-assets .assets-menu span {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

.personal .mine-others {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
}

.personal .mine-others i {
  font-size: 20px;
}

.personal .mine-others .arrow {
  font-family: "SimSun";
}

.personal .phone-number {
  margin-top: 20px;
  margin-left: 20px;
}

.personal .UID {
  margin-left: 20px;
  margin-top: 10px;
  padding-bottom: 10px;
}
</style>
