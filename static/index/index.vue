<template>
  <div class="vue">
    {{d}}
    <another-component />
  </div>
</template>

<script>
  import component from './component/component.vue'
  import module from '@/module/index.js'

  export default {
    name: 'test',
    data: () => {
      return {
        d: '123'
      }
    },
    created () {
      module()
    },
    components: {
      'another-component': component
    }
  }
</script>

<style lang="stylus">
  @import '~common/define.styl'
  .index-vue 
    color red
    font-size rem(10)
  .vue
    color blue
    clearfix()
</style>