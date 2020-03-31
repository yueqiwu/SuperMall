<template>
  <div class="loginPage">
    <nav-bar @leftClick="$router.back()">
      <template v-slot:left><div class="left-arrow"></div></template>
    </nav-bar>
    <me-scroll class="content" ref="scroll">
      <h2 class="title">蘑菇街</h2>
    <div class="tab">
      <span class="tab-item" :class="{active: isMessageLogin}" @click="isMessageLogin = true">短信登录</span>
      <span class="tab-item" :class="{active: !isMessageLogin}" @click="isMessageLogin = false">密码登录</span>
    </div>
    <div class="login-content" style="margin:0 20px;">
      <form>
        <!-- 短信登录 -->
        <div v-show="isMessageLogin">
          <div class="form-item phone">
            <input type="text" maxlength="11" placeholder="手机号" v-model.trim="messageLoginData.mobile">
            <button @click.prevent="getCode" v-show="!showCutDown">获取验证码</button>
            <span v-show="showCutDown">重新发送{{cutDownNum}}s</span>
          </div>
          <div class="form-item code">
            <input type="text" maxlength="6" placeholder="验证码" v-model.trim="messageLoginData.code">
          </div>
          <p class="prompt">温馨提示：未注册蘑菇街帐号的手机号，登录时将自动注册，且代表已同意<a href="javascript:;" style="color:green">《用户服务协议》</a></p>
        </div>
        <!-- 短信登录 -->
        <!-- 密码登录 -->
        <div v-show="!isMessageLogin">
          <div class="form-item userName">
            <input type="text" placeholder="手机号/邮箱/用户名" v-model.trim="pwdLoginData.user">
          </div>
          <div class="form-item pwd">
            <input type="password" placeholder="密码" v-model="pwdLoginData.pwd" v-show="!showPwd">
            <input type="text" placeholder="密码" v-model="pwdLoginData.pwd" v-show="showPwd">
            <div class="btn" @click="showPwd = !showPwd" :class="{active: showPwd}">
              <div class="content">
                <!-- 添加开关背景颜色用 -->
              </div>
              <div class="circle"></div>
            </div>
          </div>
          <div class="form-item pic-code">
            <input type="text" maxlength="5" placeholder="验证码" v-model.trim="pwdLoginData.code">
            <img src="~assets/img/login/yanzhengma.jpg" alt="">
          </div>
        </div>
        <!-- 密码登录 -->
        <button class="login-btn" @click.prevent='loginBtnClick'>登录</button>
        <p style="text-align:center;font-size:14px;color:#aaa;"><a href="javascript:;">关于我们</a></p>
      </form>
    </div>
    <van-divider>账号：13911111111 密码：246810</van-divider>
    <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>
    </me-scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import MeScroll from "components/common/scroll/Scroll";
import { loginApi, sendSmsCode } from 'network/login.js'
import { SET_USER } from 'store/mutation-types.js'
export default {
  name: 'Login',
  data() {
    return {
      isMessageLogin: true, // 是否短信登录
      showPwd: false, // 是否显示密码
      showCutDown: false, // 是否显示计时器
      cutDownNum: 30, // 计时器数字
      timer: null, // 定时器
      messageLoginData: { // 短信登录的数据
        mobile: '',
        code: ''
      },
      pwdLoginData: { // 密码登录的数据
        user: null,
        pwd: null,
        code: null
      }
    }
  },
  components: {
    NavBar,
    MeScroll
  },
  methods: {
    async getCode () { // 获取验证码
      let {mobile, code} = this.messageLoginData
      if (!mobile) {
        return this.$toast.show('手机号不能为空')
      } else if (!/^1(3|5|6|7|8|9)\d{9}$/.test(mobile)) {
        return this.$toast.show('请输入正确的手机号')
      } 
      this.showCutDown = true
      // ajax 请求后再开始
      try {
        await sendSmsCode(this.messageLoginData.mobile)
      } catch(err) {
        this.$toast.show('发送验证码失败')
      }
      this.timer = window.setInterval(()=>{
        this.cutDownNum--
        if (this.cutDownNum <=0 ) {
          window.clearInterval(this.timer)
          this.showCutDown = false
          this.cutDownNum = 30
        }
      },1000)
    },
    async loginBtnClick () { // 点击登录按钮
      if (this.isMessageLogin) { // 短信登录
        let {mobile, code} = this.messageLoginData
        if (!mobile) {
          return this.$toast.show('手机号不能为空')
        } else if (!code) {
          return this.$toast.show('验证码不能为空')
        } else if (!/^1(3|5|6|7|8|9)\d{9}$/.test(mobile)) {
          return this.$toast.show('请输入正确的手机号')
        } else if (!/^\d{6}$/.test(code)) {
          return this.$toast.show('请输入正确的验证码')
        }
        // 发ajax
        try {
          const {data} = await loginApi(this.messageLoginData)
          this.$toast.show('登录成功')
          this.$store.commit(SET_USER, data.data)
          const url = this.$route.query.redirect || '/home'
          this.$router.replace(url)
        } catch(err) {
          this.$toast.show('登录失败')
          console.log(err)
        }

      } else { // 密码登录
        let {user, pwd, code} = this.pwdLoginData
        // 发ajax...
      }
    }
  }
}
</script>

<style scoped>
  .loginPage {
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:#fff;
    z-index:10;
  }
  .title {
    font-size:35Px;
    text-align:center;
    color: var(--color-tint);
    margin-top:30px;
  }
  .tab {
    text-align:center;
    margin-top:30px;
    font-size:14px;
  }
  .tab-item {
    padding:5px 0;
    margin: 0 13px; 
  }
  .tab-item.active {
    color: var(--color-tint);
    border-bottom: 2px solid var(--color-tint);
  }
  .login-content .form-item {
    margin:20px 0px;
    border:1px solid var(--color-tint);
    height:40px;
    line-height: 40px;
    padding:0 5px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
  .login-content .form-item input {
    border:none;
    outline: none;
    flex:1;
    height:32px;
    line-height: 32px;
  }
  .login-content .phone button {
    height: 30px;
    line-height: 30px;
    background: #fff;
    color:#ccc;
    box-shadow: none;
    border:none;
  }
  .login-content .prompt {
    font-size:14px;
    color:#aaa;
  }
  .login-content .pwd > .btn {
    width:40px;
    height:20px;
    border-radius: 10px;
    border:1px solid #ccc;
    position: relative;
    background:#fff;
    overflow: hidden;
  }
  .login-content .pwd > .btn > .content {
    height:100%;
    width:0;
    background: greenyellow;
    transition: width .5s;
  }
  .login-content .pwd > .btn > .circle {
    width:20px;
    height:20px;
    border-radius: 50%;
    border:1px solid #ccc;
    background:#fff;
    position: absolute;
    top:0;
    bottom:0;
    margin:auto;
    transition: transform .5s;
  }
  .login-content .pwd > .btn.active > .content {
    width:100%;
  }
  .login-content .pwd > .btn.active .circle {
    transform: translateX(20px)
  }
  .login-content .pic-code > img {
    width:20%;
  }
  .login-btn {
    display: block;
    width:100%;
    height:40px;
    text-align:center;
    border:none;
    color:#fff;
    background:var(--color-tint);
    border-radius: 5px;
    margin: 20px 0;
  }
  .left-arrow {
    width: 10px;
    height: 10px;
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    transform: rotate(-45deg);
  }
  .content {
    position: absolute;
    top: 44Px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>