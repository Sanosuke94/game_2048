<template>
</template>
<script>
import boardJS from '@/board/board'

export default {
  name: 'Home',
  data () {
    this.background()
  },
  created () {
  },
  methods: {
    background () {
      boardJS.init('4')
    },
    moveUp () {
      boardJS.move('up')
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
