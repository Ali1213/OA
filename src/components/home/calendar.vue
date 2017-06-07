<template>
  <div class="calendar">
    <div class="calendar-header">
      <i class="icon icon-arrow-left"></i>
      <p>年月</p>
      <i class="icon icon-arrow-right"></i>
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
      <li></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      date: (() => new Date())()
    }
  }
}
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>
  .calendar
    width: 350px
    border: 1px solid #b5b5b5
    border-radius: 2px
    .calendar-header
      height: 40px
      line-height: 40px
      color: #333
      background-color: #eee
      .icon
      width: 8px
      height: 13px
      display: inline-block
      background-size: 8px 13px
      background-repeat: no-repeat
      .icon-arrow-left
        background-image: url("./arrow-left.png")
        float: left
        margin-left: 12px
      .icon-arrow-right
        background-image: url("./arrow-right.png")
        float: right
        margin-right: 12px
    .days
    .dates
</style>
