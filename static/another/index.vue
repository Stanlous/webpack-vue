<template>
  <div class="vue">
    {{d}}
    <another-component />
  </div>
</template>

<script>
  import component from './component/component.vue'

  export default {
    name: 'test',
    data: () => {
      return {
        d: 'another'
      }
    },
    created () {
      console.log(1234)
    },
    components: {
      'another-component': component
    }
  }
</script>

<style lang="stylus">
  rem(px)
    px * 1rem
  .index-vue 
    color red
    font-size rem(10)
  .vue
    color blue
</style>