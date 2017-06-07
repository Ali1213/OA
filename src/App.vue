<template>
  <div id="app">
    <div class="menu-wrapper">
      <nav-menu></nav-menu>
    </div>
    <div class="wrapper">
      <v-header></v-header>
      <div class="content-wrapper">
        <guide></guide>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from './common/js/eventBus'
  import header from "@/components/header/header"
  import menu from "@/components/menu/menu"
  import guide from "@/components/guide/guide"

export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
  },
  components: {
    "v-header": header,
    "nav-menu": menu,
     guide
  }
}
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
#app
  min-width: 980px
  overflow: hidden
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  font-size: 14px
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #333
  .menu-wrapper
    float: left
    width: 15%
    min-width: 200px
    background-color: #4b5d7b
    padding-bottom: 9900px
    margin-bottom: -9900px
  .wrapper
    padding-left: 15%
    padding-bottom: 9900px
    margin-bottom: -9900px
    .content-wrapper
      min-height: 100%
      padding: 1.2%
      box-sizing: border-box
      background-color: #f0f0f0
      color: #3c3c3c
      .guide
        margin-bottom: 10px

</style>
