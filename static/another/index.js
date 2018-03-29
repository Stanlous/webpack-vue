import _ from 'lodash';
import { printMe } from './print.js';
import commonModule from './common-module.js'
import Vue from 'vue'
import index from './index.vue'

new Vue({
  el: '#app',
  template: '<index />',
  components: {
    index 
  }
})