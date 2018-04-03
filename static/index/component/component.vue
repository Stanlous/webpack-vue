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
  @import '~common/define.styl'
  @import '~index/index.styl'
  .component
    font-size rem(2)
    box-sizing border-box
    background url('../img/background.png')
</style>