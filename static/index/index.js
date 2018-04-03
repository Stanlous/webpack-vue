import _ from 'lodash';
import { printMe } from './lib/print.js';
import commonModule from './lib/common-module.js'
import Vue from 'vue'
import index from './index.vue'

new Vue({
  el: '#app',
  template: '<index />',
  components: {
    index 
  }
})