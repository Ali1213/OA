<template>
  <transition name="fade">
    <div class="calendar">
      <div class="calendar-header">
        <i class="icon icon-arrow-left" @click="tabMonth(-1)"></i>
        {{date.getFullYear()}}年{{date.getMonth()+1}}月
        <i class="icon icon-arrow-right" @click="tabMonth(1)"></i>
      </div>
      <ul class="days">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul class="dates">
        <li v-for="d in renderByDate" @click="selectDate(d.time)">
          <p  :class="{'past': d.class==='past','choosed': selectTime===d.time}">
            {{d.date}}
          </p>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      date: (() => new Date())(),
      selectTime: 0
    }
  },
  methods: {
    selectDate(time) {
      this.selectTime = time
      this.$emit('selectDate',this.selectTime)
    },
    tabMonth(n) {
      //问题：发现直接为this.date设置新的月份，并不能触发视图的更新，而需要将时间重新赋值给this.date
      this.date = new Date(this.date.setMonth(this.date.getMonth()+n))
    }
  },
  computed: {
    renderByDate() {
      this.dataNums = []
      //此处遇到的问题，因为保存的是时间对象，所以存在引用的问题，如果想要this.date不受影响，可以转为时间戳之后再转为对象，赋值给dat
      let dat = new Date(this.date.getTime())
      let nowMonth = this.date.getMonth()
      dat.setDate(1)
      dat.setDate(1-dat.getDay())
      for(let i=0;i<42;i++){
        if(dat.getMonth() !== nowMonth){
          this.dataNums.push({
            class: "past",
            date: dat.getDate(),
            time: dat.getTime(),
          })
        }else{
          this.dataNums.push({
            class: "now",
            date: dat.getDate(),
            time: dat.getTime()
          })
        }
        dat.setDate(dat.getDate()+1)
      }
      return this.dataNums
    }
  },
  created() {
  }
}
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
  .fade-enter-active
    transition: all .3s ease
    opacity: 1
  .fade-leave-active
    transition: all .8s linear
    opacity: 1
  .fade-enter, .fade-leave-active
    opacity: 0
    transform: translateY(200px)
  .calendar
    width: 350px
    border: 1px solid #b5b5b5
    border-radius: 2px
    background-color: #fff
    .calendar-header
      width: 100%
      height: 40px
      line-height: 40px
      font-size: 16px
      color: #333
      background-color: #eee
      text-align: center
      .icon
        width: 8px
        height: 13px
        padding: 14px 12px
        display: inline-block
        background-size: 8px 13px
        background-repeat: no-repeat
      .icon-arrow-left
        background-image: url("./arrow-left.png")
        float: left
        background-position: 12px 14px
      .icon-arrow-right
        background-image: url("./arrow-right.png")
        float: right
        background-position: 12px 14px
    .days
      height: 30px
      line-height: 30px
      border-bottom: 1px solid #b5b5b5
      li
        height: 30px
        line-height: 30px
        float: left
        font-size: 14px
        text-align: center
        width: 50px
    .dates
      li
        float: left
        width: 50px
        height: 40px
        cursor: pointer
        p
          margin: 5px 10px
          width: 30px
          height: 30px
          line-height: 30px
          text-align: center
          font-size: 14px
          color: #333
          cursor: pointer
          &.past
            color: #999
          &.choosed
            border-radius: 50%
            color: #fff
            background-color: #f13b4c
</style>
