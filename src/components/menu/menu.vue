<template>
  <div class="menu">
    <div class="logal-wrapper" @click="choosedPages('首页','home')">
      <router-link :to="{name: 'home'}">
        <img src="./logal.png" alt="logal" class="logal">
      </router-link>
    </div>
    <ul class="nav-header">
      <li :class="{'active':activeHeader}" @click="tabNavHeader(true)">
          <i class="icon icon-finance"></i>
          <h1>财务系统</h1>
      </li>
      <li :class="{'active':!activeHeader}" @click="tabNavHeader(false)">
        <i class="icon icon-hr"></i>
        <h1>人力系统</h1>
      </li>
    </ul>
    <div class="nav-menu-wrapper">
      <ul class="nav-menu nav-menu-finance" v-if="activeHeader">
        <li class="nav-menu-bar"  v-for="(bar,index) in configData.finance"  >
          <p class="title" @click="tabBar(index)">
            <em>
              <i class="icon" :class="classMap[index]"></i>
            </em>
            <span>{{bar[0]}}</span>
            <i class="icon icon-arrow" v-show="bar[1]&&bar[1].length>0" :class="{'unfolded':index===currentBarIndex}"></i>
          </p>
          <ul class="nav-menu-item-wrapper"  v-show="index===currentBarIndex">
            <li class="nav-menu-item" v-for="(item,i) in bar[1]" >
              <router-link :to="{name: routersNames[i]}" class="nav-menu-item-link">
                <p class="title-wrapper" @click="choosedPages(item,routersNames[i])">
                  <span></span>
                  <em>{{item}}</em>
                </p>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {configData} from "../../../static/js/config.js"
  import Bus from '../../common/js/eventBus'

  export default {
    data () {
      return {
        configData: configData,
        currentBarIndex: -1,
        activeHeader: true,
        pagesNames: [{item:"首页",name:"home"}]
      }
    },
    methods: {
      tabNavHeader(val){
            this.activeHeader = val
      },
      tabBar(index) {
          if(this.currentBarIndex === index){
            this.currentBarIndex = -1
          }else{
            this.currentBarIndex = index
          }
      },
      choosedPages(item,name) {
        if( item !=="首页" ){
        this.pagesNames[1] = {
          item: item,
          name: name
        }
        }else{
          this.pagesNames = [{item:"首页",name:"home"}]
        }
        Bus.$emit('setPages', this.pagesNames)
    }
    },
    created() {
      this.classMap = ['icon-project-manage', 'icon-preparation', 'icon-service', 'icon-late', 'icon-docu-manage', 'icon-business-manage', 'icon-client-manage', 'icon-user-manage', 'icon-system-manage'],
      this.routersNames = ["createproject","projects","tasks"]
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
  @import "../../common/sass/_common"
  .menu
    .logal-wrapper
      line-height: 100px
      text-align: center
      background-color: $main-color-yellow
      a
        display: block
        width: 100%
        height: 100%
      .logal
        width: 90%
        vertical-align: middle
    .nav-header
      height: 80px
      li
        float: left
        width: 50%
        height: 80px
        text-align: center
        color: #fff
        background-color: #3f4d66
        &.active
          background-color: $main-color-blue
        i
          background-repeat: no-repeat
        .icon-finance
          margin: 16px auto 12px
          width: 32px
          height: 24px
          background-size: 32px 24px
          background-image: url(./icon-finance.png)
        .icon-hr
          margin: 12px auto 8px
          width: 32px
          height: 32px
          background-size: 32px 32px
          background-image: url(./icon-hr.png)
        h1
          text-align: center
          font-wight: 500
          font-size: 16px
    .nav-menu-wrapper
      .nav-menu
        .nav-menu-bar
          .title
            height: 60px
            line-height: 60px
            font-size: 16px
            color: #fff
            background-color: $main-color-blue
            em
              display: inline-block
              width: 40px
              line-height: 60px
              padding-left: 15%
              .icon
                background-repeat: no-repeat
                vertical-align: middle
              .icon-project-manage
                width: 28px
                height: 28px
                background-size: 28px 28px
                background-image: url(./icon-project-manage.png)
              .icon-preparation
                width: 24px
                height: 27px
                background-size: 24px 27px
                background-image: url(./icon-preparation.png)
              .icon-service
                width: 28px
                height: 24px
                background-size: 28px 24px
                background-image: url(./icon-service.png)
              .icon-late
                width: 25px
                height: 25px
                background-size: 25px 25px
                background-image: url(./icon-late.png)
              .icon-docu-manage
                width: 27px
                height: 27px
                background-size: 27px 27px
                background-image: url(./icon-docu-manage.png)
              .icon-business-manage
                width: 27px
                height: 27px
                background-size: 27px 27px
                background-image: url(./icon-business-manage.png)
              .icon-client-manage
                width: 29px
                height: 29px
                background-size: 29px 29px
                background-image: url(./icon-client-manage.png)
              .icon-user-manage
                width: 29px
                height: 29px
                background-size: 29px 29px
                background-image: url(./icon-user-manage.png)
              .icon-system-manage
                width: 26px
                height: 24px
                background-size: 26px 24px
                background-image: url(./icon-system-manage.png)
            span
              display: inline-block
              width: 90px
              font-size: 16px
            .icon-arrow
              width: 8px
              height: 15px
              background-image: url(./arrow-right.png)
              background-size: 8px 15px
              background-repeat: no-repeat
            .unfolded
              width: 15px
              height: 8px
              background-image: url(./arrow-down.png)
              background-size: 15px 8px
              background-repeat: no-repeat
          .nav-menu-item-wrapper
            .nav-menu-item
              height: 50px
              .nav-menu-item-link
                &:hover,&.active
                  background-color: $main-color-yellow
                display: block
                width: 100%
                height: 50px
                line-height: 50px
                color: #fff
                font-size: 14px
                background-color: #3f4d66
                .title-wrapper
                  font-size: 14px
                  margin-left: 46px
                  border-left: 1px dashed #fff
                  span
                    display: inline-block
                    vertical-align: middle
                    margin-right: 4px
                    width: 34px
                    border-top: 1px dashed #fff
                &.active
                  background-color: $main-color-yellow
            .menu-item
</style>
