<template>
  <div class="home">
    <div class="project-list">
      <ul class="list-wrapper" v-if="tasksList.length===3">
        <li class="list-item" v-for="(tasksType,index) in tasksList">
          <div class="list-header">
            <span class="icon-wrapper">
              <i class="icon" :class="tasksTypes[index]"></i>
            </span>
            <span class="title">{{tasksTypesNames[index]}}</span>
            <div class="more">
              <span class="num">{{tasksType.dataSize}}</span>
              <a href="">更多</a>
            </div>
          </div>
          <div class="content">
            <ul class="content-wrapper">
              <li class="item" :class="tasksTypes[index]" v-for="(task,i) in tasksType.jsonArray" v-if="i<3">
                <span class="icon">
                  <span>任务</span><span>{{"0"+(i+1)}}</span>
                </span>
                <div class="desc">
                  <p class="type">{{task.workType}}</p>
                  <p>
                    <span class="name">{{task.projectName}}</span><span class="endTime">{{task.endTime}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="calendar">
      <div class="calendar-inner">
        <div class="date">
          <div>
            <i class="icon arrow arrow-left" @click="changeMonth(-12)"></i>
            <span>{{getYear}}年</span>
            <i class="icon arrow arrow-right" @click="changeMonth(12)"></i>
          </div>
          <div>
            <i class="icon arrow arrow-left" @click="changeMonth(-1)"></i>
            <span>{{getMonth}}月</span>
            <i class="icon arrow arrow-right" @click="changeMonth(1)"></i>
          </div>
          <div class="active" @click="backToday">
            <span>本月</span>
          </div>
        </div>
        <div class="project-calendar">
          <ul class="week">
            <li>星期日</li>
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li class="last">星期六</li>
          </ul>
          <ul class="project-calendar-inner">
            <li v-for="date in renderByDate" class="calendar-item">
              <span :class="{'past':date.class==='past'}">
                {{date.d}}
              </span>
              <ul class="bars">
                <li v-for="(task,index) in allTasks" v-if="date.time-86400000<=new Date(task.endTime).getTime() && date.time>= new Date(task.startTime).getTime()" :style="{ background: task.displayColor,top: (index*18)+'px'}" class="bar" :class="{'head': date.time-new Date(task.startTime).getTime()<86400000,'end': new Date(task.endTime).getTime()-date.time<0 }">
                  <em v-if="date.time-new Date(task.startTime)<86400000">{{task.id}}({{task.workType}}){{task.projectManagerId}}</em>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {formatDate} from '@/common/js/date.js'
import {url} from '@/common/js/common.js'

const ERR_OK = "1"
export default {
  data () {
    return {
      date: (() => new Date())(),
      //右侧任务栏里的任务，为一个数组，包含3个分类，为3项
      tasksList: (() => [])(),
      //左侧日历里的任务
      allTasks: (() => [])()
    }
  },
  created() {
    this.tasksTypesNames = ["个人代办","个人未完成","项目未完成"]
    this.tasksTypes = ["charge","personal-uncompleted","tasks-uncompleted"]
    this.$http.post(url+'main/getTaskList.do',{
      reqType: '1'
    }).then( (response) => {
      let res = JSON.parse(response.body)
      if(res.status === ERR_OK) {
        res.jsonArray.forEach((item) => {
          this.allTasks.push(item)
        })
      }
      }).catch((e) => {})
    this.$http.post(url+'main/getTaskList.do',{
      reqType: '2'
    }).then( (response) => {
      let res = JSON.parse(response.body)
      if(res.status === ERR_OK) {
        this.tasksList.splice(0,1,res)
      }
    }).catch((e) => {})
    this.$http.post(url+'main/getTaskList.do',{
      reqType: '3'
    }).then( (response) => {
      let res = JSON.parse(response.body)
      if(res.status === ERR_OK) {
        this.tasksList.splice(1,1,res)
      }
    }).catch((e) => {})
    this.$http.post(url+'main/getTaskList.do',{
      reqType: '4'
    }).then( (response) => {
      let res = JSON.parse(response.body)
      if(res.status === ERR_OK) {
        this.tasksList.splice(2,1,res)
        console.log(this.tasksList)
      }
    }).catch((e) => {})
  },
  computed: {
    getYear() {
      return formatDate(this.date, "yyyy")
    },
    getMonth() {
      return formatDate(this.date, "MM")
    },
    renderByDate() {
      //将当下的时间对象存在一个新的时间对象中，防止污染
      let dat = new Date(this.date)
      let nowMonth = this.date.getMonth()
      //日期设置为本月的1号
      dat.setDate(1)
      //设置为第一个li对应的那天
      dat.setDate(dat.getDate()-dat.getDay())
      this.dateNums = []
      for(let i=0;i<42;i++){
        dat.getMonth() !== nowMonth?this.dateNums.push({time:dat.getTime(),d: dat.getDate(), class: "past"}):this.dateNums.push({time:dat.getTime(),d: dat.getDate(), class: "now"})
        dat.setDate(dat.getDate()+1)
      }
        return this.dateNums
    }
  },
  filters: {

  },
  methods : {
    //每次点击时间的选择器就会重新设置this.date
    changeMonth(month) {
      this.date = new Date(this.date.setMonth(Number(this.getMonth)-1 + month))
    },
    backToday() {
      this.date = new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
.home
  overflow: hidden
  .project-list
    float: right
    width: 22%
    .list-wrapper
      .list-item
        padding: 0 12px
        margin-bottom: 10px
        box-sizing: border-box
        border: 1px solid #b5b5b5
        background-color: #fff
        .list-header
          height: 40px
          line-height: 40px
          border-bottom: 1px solid #b5b5b5
          .icon-wrapper
            display: inline-block
            width: 32px
          .icon
            display: inline-block
            vertical-align: middle
          .charge
            width: 25px
            height: 25px
            background-size: 25px 25px
            background-image: url(./icon-charge.png)
          .personal-uncompleted
            width: 25px
            height: 25px
            background-size: 25px 25px
            background-image: url(./icon-personal-uncompleted.png)
          .tasks-uncompleted
            width: 24px
            height: 23px
            background-size: 24px 23px
            background-image: url(./icon-tasks-uncompleted.png)
          .title
            font-size: 16px
            line-height: 40px
            font-weight: 500
            color: #3c3c3c
          .more
            float: right
            .num
              position: relative
              top: -6px
              right: -6px
              display: inline-block
              width: 16px
              height: 16px
              line-height: 16px
              font-size: 12px
              text-align: center
              border-radius: 50%
              background: #f1394a
              color: #fff
        .content
          padding: 6px 0
          .content-wrapper
            .item
              height: 60px
              padding: 7px 0
              &:hover
                .icon
                  background-color: #f1394a
                  span
                    color: #fff
                .desc
                  border: 1px solid #f1394a
                  border-radius: 8px
                  position: relative
                  &:before
                    content: ""
                    width: 0
                    height: 0
                    border-width: 10px
                    border-style:  solid
                    border-color: transparent #f1394a transparent transparent
                    position: absolute
                    bottom: 50%
                    margin-bottom: -10px
                    left: -20px
              .icon
                float: left
                vertical-align: middle
                display: inline-block
                width: 56px
                height: 56px
                padding:  10px 0
                margin: 0 0px
                box-sizing: border-box
                border-radius: 50%
                background-color: #eee
                span
                  display: block
                  line-height: 18px
                  font-size: 14px
                  text-align: center
                  color: #666
              .desc
                margin-left: 68px
                padding: 10px 4px 10px 4px
                height: 40px
                p
                  overflow: hidden
                  height: 20px
                  line-height: 20px
                  font-size: 14px
                .type
                  font-weight: 500
                  color: #333
                .name
                  display: inline-block
                  width: 50%
                  overflow: hidden
                  text-overflow: ellipsis
                  white-space: nowrap
                  color: #3c3c3c
                .endTime
                  float: right
                  color: #666
            .charge
              &:hover
                .icon
                  background-color: #0071c5
                .desc
                  border: 1px solid #0071c5
                  &:before
                    border-color: transparent  #0071c5 transparent transparent
      .list-item:last-child
        margin-bottom: 0
  .calendar
    width: 100%
    height: 100%
    .calendar-inner
      margin-right: 23%
      padding: 25px 1.2%
      height: 100%
      border: 1px solid #b5b5b5
      background-color: #fff
      .date
        margin-bottom: 26px
        font-size: 0
        > div
          vertical-align: middle
          text-align: center
          display: inline-block
          padding: 6px 10px
          margin-right: 10px
          height: 22px
          line-height: 22px
          border: 1px solid #b5b5b5
          > span
            cursor: default
            font-weight: 600
          .icon
            display: inline-block
            background-repeat: no-repeat
          .arrow
            width: 8px
            height: 13px
            background-size: 8px 13px
            padding: 4px 4px 4px 6px
            background-position-y: 4px
          .arrow-left
            background-image: url(./arrow-left.png)
            border-right: 1px solid #b5b5b5
          .arrow-right
            background-image: url(./arrow-right.png)
            background-position-x: 8px
            border-left: 1px solid #b5b5b5
          span
            display: inline-block
            vertical-align: top
            padding: 0 20px
            font-size: 16px
            font-weight: 500
            color: #3c3c3c
          &.active
            background-color: #eaf1f9
      .project-calendar
        border-right-width: 0px
        border-bottom-width: 0px
        border-left-width: 1px
        border-top-width: 1px
        border-style: solid
        border-color: #b5b5b5
        background-color: #fff
        .week
          background: #647ba1
          overflow: hidden
          li
            float: left
            width: (1/7)*100%
            box-sizing: border-box
            line-height: 40px
            text-align: center
            background: #647ba1
            color: #fff
            font-size: 16px
            border-right: 1px solid #dcdcdc
            &.last
              border-right: none
        .project-calendar-inner
          overflow: hidden
          .calendar-item
            float: left
            width: (1/7)*100%
            box-sizing: border-box
            min-height: 110px
            border-right-width: 1px
            border-bottom-width: 1px
            border-left-width: 0px
            border-top-width: 0px
            border-style: solid
            border-color: #b5b5b5
            color: #333
            span
              float: right
              padding: 4px
              font-size: 16px
              line-height: 20px
            .bars
              position: relative
              overflow: hidden
              margin-top: 28px
              padding-top: 100%
              width: 100%
              /*min-height: 82px*/
              .bar
                width: 100%
                height: 16px
                margin-bottom: 1px
                position: absolute
                left: 0
                color: #fff
                &.head
                  border-radius: 8px 0 0 8px
                &.end
                  border-radius: 0 8px 8px 0
                em
                  display: inline-block
                  min-width: 100%
                  white-space: nowrap
                  font-style: normal
                  font-size: 12px
                  text-indent: 6px
                  color: #fff
                  line-height: 16px
            .past
              color: #999
</style>
