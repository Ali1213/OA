<template>
  <div class="header">
    <img src="./slogan.png" alt="title" class="slogan">
    <p class="date">
      <span>{{formatDate}}</span>
      <span>{{formatTime}}</span>
      <span>{{getDay}}</span>
    </p>
    <div class="log">
      <div class="logout" @click="logout">
        <i class="icon icon-logout"></i>
        <p>退出</p>
      </div>
      <div class="welcome">
        <img class="avatar">
        <span>您好，admin</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {formatDate,getDay} from '@/common/js/date.js'
export default {
  data () {
    return {
      date: (() => {
        return new Date()
      })()
    }
  },
  computed: {
    formatDate() {
      return formatDate(this.date,"yyyy-MM-dd")
    },
    formatTime() {
      return formatDate(this.date,"hh:mm")
    },
    getDay() {
      return getDay(this.date)
    }
  },
  methods: {
    test() {
      console.log(formatDate(this.date,"yyyy-MM-dd"))
    },
    logout() {
//      this.loginShow = true
      //可能需要借助本地存储存一下用户的登录状态
      this.$router.push({name: "login"})
    }
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
    @import "../../common/sass/_common"

    .header
      height: 100px
      background-color: $main-color-blue
      .slogan
        margin-lfet: 32px
        vertical-align: middle
      .date
        display: inline-block
        margin-left: 20px
        font-size: 0
        color: #fff
        span
          display: inline-block
          margin-right: 6px
          font-size: 14px
      .log
        float: right
        height: 100px
        @media screen and (max-width: 1000px)
          display: none
        .logout
          float: right
          width: 130px
          height: 100px
          background-color: #3f4d66
          text-align: center
          text-align: center
          .icon-logout
            width: 38px
            height: 37px
            margin: 22px auto 10px
            background-image: url(./icon-logout.png)
            background-size:  38px 37px
            background-repeat: no-repeat
          p
            font-size: 14px
            color: #fff
            text-align: center
        .welcome
          float: right
          height: 100px
          margin-right: 30px
          font-size: 0
          .avatar
            margin-top: 20px
            width: 60px
            height: 60px
            border-radius: 50%
            border: 2px solid #fff
          span
            vertical-align: top
            display: inline-block
            margin-left: 16px
            line-height: 100px
            font-size: 14px
            color: #fff
  </style>
