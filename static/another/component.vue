<template>
  <div class="component">{{component}}</div>
</template>

<script>
  export default {
    name: 'test',
    data: () => {
      return {
        component: 'component'
      }
    }
  }
</script>

<style lang="stylus">
  @import '~index/index.styl'
  .component-vue
    font-size rem(10)
    box-sizing border-box
</style>