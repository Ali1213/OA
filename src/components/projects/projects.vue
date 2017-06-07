<template>
  <div class="projects">
    <v-table :searchTypes="searchTypes" :columns="columns" :sortTypes="sortTypes"></v-table>
  </div>
</template>

<script type="text/ecmascript-6">
import table from '@/components/table/table.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    "v-table": table
  },
  created() {
    this.searchTypes = ["项目名称","项目类型","项目经理"]
    this.columns = ["项目编号","项目名称","项目类型","项目经理","开始时间","结束时间"]
    this.sortTypes = ["bianhao","mingcheng","leixing","jingli","start","end"]
  }
}
</script>

<style rel="stylesheet/sass" lang="sass" type="text/sass" scoped>

</style>
