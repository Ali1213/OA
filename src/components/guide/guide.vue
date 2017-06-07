<template>
  <div class="guide">
    <i class="icon icon-home"></i>
    <em class="current-page-text">当前位置：</em>
    <strong class="current-page">
      <span>
        <router-link to="{name:'home'}" class="link-item">首页</router-link>
      </span>
      <span v-if="pagesNames[1]">
        <i class="arrow-left"></i>
        <router-link to="{name: pagesNames[1].name}" class="link-item">{{pagesNames[1].item}}</router-link>
      </span>
    </strong>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../common/js/eventBus'
  //  用中央事件主线解决非父子组件通信的问题，但是我用的不熟，现在新出现的问题是数据改了，但是dom不改
  export default {
    props: {
    },
    data() {
        return {
          pagesNames: [{item:"首页",name:"home"}]
        }
    },
    created() {
      Bus.$on('setPages', pagesNames => {
        this.pagesNames = pagesNames
      })
    }
  }
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
.guide
  box-sizing: border-box
  padding-left: 1.2%
  height: 48px
  line-height: 48px
  border: 1px solid #b5b5b5
  background-color: #fff
  color: #666
  font-size: 14px
  .icon
    display: inline-block
  .icon-home
    width: 19px
    height: 19px
    margin-right: 10px
    background-size: 19px 19px
    background-repeat: no-repeat
    background-image: url(./guide.png)
  .current-page-text
    color: #666
  .current-page
    line-height: 48px
    color: #666
    .arrow-left
    .link-item
      color: #666
</style>
