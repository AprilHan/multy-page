import Vue from 'vue'
import app from './app'
console.log(app)
new Vue({
  el: '#index',
  template: `<app></app>`,
  components: {
    app
  }
})

