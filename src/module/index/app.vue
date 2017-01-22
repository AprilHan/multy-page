<template>
  <div>
      <h1>{{ msg }}</h1>
      <input type="text" v-focus>
  </div>
</template>
<script>
  export default {
    data () {
      return  {
          msg: '标题'
      }
    },
    directives: {
      focus : {
        inserted (el) {
            // 聚焦元素
            el.focus()
        }
      }
    }
  }
</script>
<style>
  h1 {
    background-color: pink;
  }
</style>
