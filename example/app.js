import Vue from 'vue'
import Example from './Example'
import FastClick from 'fastclick'

FastClick.attach(document.body)

new Vue({
  el: '#app',
  render: h => h(Example)
})
