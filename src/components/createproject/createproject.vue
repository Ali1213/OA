<template>
  <div class="create-project container">
    <ul class="form" ref="form">
      <li class="form-group">
        <span class="title">项目名：</span>
        <input type="text" placeholder="请输入项目名" class="input-item">

        <em class="icon must">*</em>
        <p class="remind" v-show="checkShow[0]">
          <i class="icon icon-remind"></i>
          <span class="remind-text"></span>
        </p>
      </li>
      <li class="form-group">
        <span class="title">选择客户：</span>
        <select class="input-item">
          <option value="你好">你好</option>
        </select>
        <em class="icon must">*</em>
        <p class="remind" v-show="checkShow[1]">
          <i class="icon icon-remind"></i>
          <span class="remind-text"></span>
        </p>
      </li>
      <li class="form-group">
        <span class="title">选择项目经理：</span>
        <select class="input-item">
          <option value="你好">你好</option>
        </select>
        <em class="icon must">*</em>
        <p class="remind" v-show="checkShow[2]">
          <i class="icon icon-remind"></i>
          <span class="remind-text"></span>
        </p>
      </li>
      <li class="form-group">
        <span class="title">开始时间：</span>
        <div class="select-time">
          <input type="text" placeholder="年/月/日" class="input-item" :value="startTime | formatDate">
          <span class="icon-select-time-wrapper" @click="selectStartCalendar">
            <i class="icon icon-select-time"></i>
          </span>
          <calendar v-show="showStartCalendar" @selectDate="selectDateStart"></calendar>
        </div>
        <em class="icon must">*</em>
        <p class="remind" v-show="checkShow[3]">
          <i class="icon icon-remind"></i>
          <span class="remind-text"></span>
        </p>
      </li>
      <li class="form-group">
        <span class="title">结束时间：</span>
        <div class="select-time">
          <input type="text" placeholder="年/月/日" class="input-item" :value="endTime | formatDate">
          <span class="icon-select-time-wrapper" @click="selectEndCalendar">
            <i class="icon icon-select-time"></i>
          </span>
          <calendar v-show="showEndCalendar" @selectDate="selectDateEnd"></calendar>
        </div>
        <em class="icon must">*</em>
        <p class="remind" v-show="checkShow[4]">
          <i class="icon icon-remind"></i>
          <span class="remind-text"></span>
        </p>
      </li>
    </ul>
    <input type="button" value="创建项目" class="create-button" @click="createProject">
  </div>
</template>

<script type="text/ecmascript-6">
  import calendar from '@/components/calendar/calendar.vue'
  import {formatDate} from '@/common/js/date.js'

  export default {
    data () {
      return {
        checkShow: [false,false,false,false,false],
        showStartCalendar: false,
        showEndCalendar: false,
        startTime: 0,
        endTime: 0
      }
    },
    filters: {
      formatDate(time){
        if(time === 0){
          return ""
        }
        return formatDate(new Date(time), "yyyy/MM/dd")
      }
    },
    methods: {
      createProject() {
        let form = this.$refs.form
        let inputItems = form.querySelectorAll(".input-item")
        let remindTexts = form.querySelectorAll(".remind-text")
        let reg = /^[\u4E00-\u9FA5a-zA-Z0-9]+$/
        let check = (index) => {
          let val = inputItems[index].value.trim()
          if( !val ){
            this.checkShow.splice(index,1,true)
            switch(index) {
              case 0:
                remindTexts[0].innerHTML = "请输入正确格式的项目名称，为汉字或大小写字母的组合"
                break
              case 3:
                remindTexts[3].innerHTML = "请选择开始时间"
                break
              case 4:
                remindTexts[4].innerHTML = "请选择结束时间"
                break
            }
            return  false
          }else{
            switch(index) {
              case 0:
                if( !val.match(reg) ){
                  this.checkShow.splice(0,1,true)
                  remindTexts[0].innerHTML = "请输入正确格式的项目名称，为汉字或大小写字母的组合"
                }else{
                  this.checkShow.splice(0,1,false)
                  return true
                }
                break
              default:
                this.checkShow.splice(index,1,false)
                return true
            }
          }
        }
        let checkAll = () => {
          return [0,1,2,3,4].every((item,index) => {
            return check(index) === true
          })
        }
        if( checkAll() ){
          this.$router.push({name: "projects"})
        }
      },
      selectStartCalendar() {
        this.startTime = 0
        this.showStartCalendar = true
      },
      selectEndCalendar() {
        this.endTime = 0
        this.showEndCalendar = true
      },
      //监听子组件后触发的事件
      selectDateStart(time) {
        this.startTime = time
        this.showStartCalendar = false
      },
      selectDateEnd(time) {
        this.endTime = time
        this.showEndCalendar = false
      }
    },
    components: {
      calendar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
.create-project
  .form
   .form-group
     position: relative
     margin-bottom: 16px
     .title
        width: 120px
        height: 42px
        line-height: 42px
        text-align: right
        font-size: 14px
        color: #333
        display: inline-block
     .select-time
       position: relative
       display: inline-block
       vertical-align: middle
       width: 352px
       height: 42px
       .icon-select-time-wrapper
         display: inline-block
         width: 50px
         height: 40px
         position: absolute
         top: 1px
         right: 1px
         background-color: #eee
         .icon-select-time
           display: inline-block
           margin: 8px 13px
           width: 24px
           height: 24px
           background-size: 24px 24px
           background-image: url("./icon-select-time.png")
       .calendar
         position: absolute
         left: 0px
         top: 40px
         z-index: 10
     input,select
        width: 350px
        height: 20px
        line-height: 20px
        padding: 10px 0
        text-indent: 6px
        border: 1px solid #b5b5b5
        border-radius: 4px
        font-size: 14px
        color: #333
     select
       height: 40px
       line-height: 40px
     .icon
        display: inline-block
     .must
       margin: 0 8px
       position: relative
       top: 4px
       font-size: 16px
       font-weight: 600
       color: #ff1010
     .remind
       height: 40px
       line-height: 40px
       position: absolute
       left: 502px
       top: 0
       .icon-remind
         width: 14px
         height: 14px
         margin: 14px 2px
         vertical-align: middle
         background-repeat: no-repeat
         background-image: url("./icon-remind.png")
         background-size: 14px 14px
       .remind-text
         font-size: 14px
         line-height: 40px
         color: #666
  .create-button
    width: 200px
    height: 40px
    line-height: 40px
    font-size: 16px
    margin: 10px 0 310px 112px
    border-radius: 4px
    text-align: center
    color: #fff
    background-color: #de8800
</style>
