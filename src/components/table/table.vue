<template>
  <div class="table container">
    <div class="table-wrapper">
      <div class="direct">
        <ul>
          <li v-for="searchType in searchTypes">
            <span>{{searchType}}：</span>
            <input type="text">
          </li>
        </ul>
        <input type="button" value="搜索" class="search">
      </div>
      <div class="form">
        <table>
          <thead>
            <tr>
              <th v-for="(type,k) in sortTypes" @click="sortBy(type)" :class="{'active':sortType===type }">{{columns[k]}}
                <span class="arrow" :class="sortOrders[type] > 0 ? 'asc' : 'dsc'"></span>
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project,i) in formatDatas" :class="i%2===1? 'even' : 'odd'">
              <td v-for="(type,index) in sortTypes" v-if="index < sortTypes.length">{{project[type]}}</td>
              <td :class="{'hidden':i > projects.length-1}">查看</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0

export default {
  props: {
    searchTypes: {
      type: Array,
      default: ["项目名称","项目类型","项目经理"],
      required: true
    },
    columns: {
      type: Array,
      default: ["项目编号","项目名称","项目类型","项目经理","开始时间","结束时间"],
      required: true
    },
    sortTypes: {
      type: Array
    }
  },
  data () {
    return {
      projects: [],
      sortType: "",
      sortOrders: {}
    }
  },
  created() {
    this.$http.get('/api/projects').then( (response) => {
      response = response.body
      if( response.errno === ERR_OK) {
        this.projects = response.data
      }
    })
    this.sortTypes.forEach((type) => {
      this.sortOrders[type] = 1
    })
//    console.log(this.sortOrders)
  },
  computed: {
    formatDatas() {
      let projects = [...this.projects]
      if(projects.length && projects.length<10){
        let len = projects.length
        for(let i= len;i<10;i++){
          projects.push({})
        }
        return projects
      }
    }
  },
  methods: {
    sortBy(type) {
      this.sortType = type
      this.sortOrders[type] = this.sortOrders[type]*(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
  @import '../../common/sass/_common.sass'

  .table
    .table-wrapper
      .direct
        height: 36px
        font-size: 0
        overflow: hidden
        ul
          li
            float: left
            span
              font-size: 16px
              line-height: 34px
            input[type="text"]
              margin: 0 24px 0 2px
              height: 20px
              line-height: 20px
              padding: 6px 4px
              font-size: 14px
              border: 1px solid #dcdcdc
        .search
          color: #fff
          height: 32px
          line-height: 34px
          padding: 0 22px
          border-radius: 2px
          font-size: 16px
          text-align: center
          background-color: $main-color-yellow
      .form
        margin-top: 20px
        table
          width: 100%
          border: 1px solid #dcdcdc
          th,td
            font-size: 14px
            padding: 6px 20px
          thead
            tr
              th
                font-size: 16px
                height: 40px
                line-height: 40px
                color: rgba(255,255,255,0.7)
                text-align: center
                border-right: 1px solid #dcdcdc
                background-color: #647ba1
                cursor: pointer
                -webkit-user-select: none
                -moz-user-select: none
                -ms-user-select: none
                user-select: none
                &.active
                  color: #fff
                  font-weight: 500
                  .arrow
                    opacity: 1
                .arrow
                  display: inline-block
                  vertical-align: middle
                  width: 0
                  height: 0
                  margin-left: 5px
                  opacity: 0.7
                  &.asc
                    border-left: 6px solid transparent
                    border-right: 6px solid transparent
                    border-bottom: 6px solid #fff
                  &.dsc
                    border-left: 6px solid transparent
                    border-right: 6px solid transparent
                    border-top: 6px solid #fff
          tbody
            tr
              &.even
                background-color: #e5edf7
              td
                height: 40px
                line-height: 40px
                border-right: 1px solid #dcdcdc
                text-align: center
                &.hidden
                  opacity: 0
</style>
