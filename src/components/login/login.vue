<template>
<div class="login">
  <div class="wrapper">
    <header>
      <i class="icon logal"></i>
      <i class="icon slogan"></i>
    </header>
    <div class="log-wrapper">
      <div class="form" ref="user">
        <div class="form-group">
          <div class="icon-wrapper">
            <i class="icon user"></i>
          </div>
          <input type="text">
        </div>
        <div class="remind">
          <p class="user-remind"  v-show="userRemindShow">
            <i class="icon wrong"></i>
            <span class="remind-message"></span>
          </p>
        </div>
      </div>
      <div class="form" ref="password">
        <div class="form-group">
          <div class="icon-wrapper">
            <i class="icon password"></i>
          </div>
          <input type="password">
        </div>
        <div class="remind">
          <p class="password-remind" v-show="passwordRemindShow">
            <i class="icon wrong"></i>
            <span class="remind-message"></span>
          </p>
        </div>
      </div>
      <div class="form-group">
        <input type="button" value="登录" class="login-button" @click="showLogin">
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Bus from '@/common/js/eventBus.js'
import {url} from '@/common/js/common.js'

const ERR_OK = "1"
const ERR_WRONG = "0"
export default {
  props: {

  },
  data() {
    return {
      userRemindShow: false,
      passwordRemindShow: false
    }
  },
  methods: {
    showLogin() {
      /*用户输入用户名和密码的校验*/
      let reg = /^[a-zA-Z0-9]{1,30}/
      let flag = false
      let user = this.$refs.user
      let userInput = user.querySelector("input")
      let password = this.$refs.password
      let passwordInput = password.querySelector("input")
      let passwordRemind = password.querySelector(".remind-message")
      let test = (ele) => {
        let input = ele.querySelector("input")
        let message = ele.querySelector(".remind-message")
        let val = input.value.trim()
        if(!val || !val.match(reg)){
          flag = false
          switch(ele) {
            case user:
              this.userRemindShow = true
              message.innerHTML = "请输入正确的用户名"
              break
            case password:
              this.passwordRemindShow = true
              message.innerHTML = "请输入正确的密码"
              break
          }
        }else{
          flag = true
          switch(ele) {
            case user:
              this.userRemindShow = false
              break
            case password:
              this.passwordRemindShow = false
              break
          }
        }
      }
      test(user)
      test(password)
      if(!this.userRemindShow && !this.passwordRemindShow && flag){
        //发送请求校验用户密码账号是否一致
        //let loginShow = false
        //Bus.$emit("log.toogle",loginShow)
        this.$http.post(url+'logon.do',{
          userName:userInput.value.trim(),
          password:passwordInput.value.trim()
        }).then((response) => {
          let res = JSON.parse(response.body)
          if(res.status === ERR_OK){
            this.$router.push({name: "home"})
          }else {
            this.passwordRemindShow = true
            passwordRemind.innerHTML = res.errMsg
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
.login
  position: fixed
  top: 0px
  left: 0px
  z-index: 99
  width: 100%
  height: 100%
  background-color: #3f4d66
  .wrapper
    position: absolute
    top: 50%
    left: 50%
    width: 448px
    height: 370px
    margin-top: -185px
    margin-left: -224px
    header
      height: 70px
      line-height: 70px
      margin-bottom: 10px
      .icon
        display: inline-block
        background-repeat: no-repeat
      .logal
        float: left
        width: 241px
        height: 70px
        background-image: url("./logal.png")
        background-size: 241px 70px
      .slogan
        float: right
        margin: 30px 0 0 76px
        width: 130px
        height: 30px
        background-image: url("./slogan.png")
        background-size: 130px 30px
    .log-wrapper
      box-sizing: border-box
      padding: 30px
      background: #4b5d7b
      .form-group
        height: 50px
        overflow: hidden
        border-radius: 4px
        font-size: 0
        .icon-wrapper
          float: left
          display: inline-block
          width: 70px
          height: 50px
          line-height: 50px
          text-align: center
          background: #d5e2f3
          vertical-align: middle
          .icon
            display: inline-block
            background-repeat: no-repeat
            margin-top: 13px
            position: relative
          /*&:after
            content: ""
            width: 0
            height: 0
            position: absolute
            top: 20px
            right: -10px
            border-width: 50px
            border-style: solid
            border-color: transparent  transparent transparent #d5e2f3 */
          .user
            width: 21px
            height: 24px
            background-size: 21px 24px
            background-image: url("./icon-user.png")
          .password
            width: 23px
            height: 23px
            background-size: 23px 23px
            background-image: url("./icon-password.png")
        input[type='text'],
        input[type='password']
          float: left
          width: 318px
          height: 24px
          line-height: 24px
          padding: 13px 0
          text-indent: 0.5em
          font-size: 14px
          color: #333
        .login-button
          width: 100%
          height: 50px
          line-height: 50px
          background: #de8800
          letter-spacing: 8px
          font-size: 18px
          color: #fff
      .remind
        line-height: 40px
        height: 40px
        margin-left: 70px
        > p
          font-size: 0px
          .icon
            display: inline-block
          .wrong
            width: 14px
            height: 14px
            line-height: 40px
            position: relative
            top: 4px
            background-size: 14px 14px
            background-repeat: no-repeat
            background-image: url("./icon-wrong.png")
          span
            font-size: 12px
            display: inline-block
            text-indent: 4px
            color: #fff
            line-height: 40px
</style>
