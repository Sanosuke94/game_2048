<template>
  <div> {{ background }}</div>
</template>
<script>
import api from '@/untils/api'
import boardJS from '@/board/board'

export default {
  name: 'Home',
  data () {
    post: []
    error: []
  },
  created () {
    this.background()
    api.get('post')
      .then(response => {
        console.log('Ok')
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    background () {
      boardJS.init(4)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
