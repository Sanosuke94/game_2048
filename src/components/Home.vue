<template>
  <div>
    <h1>game 2048: {{post.body}}</h1>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    post: []
    error: []
  },
  created () {
    axios.get(' https://leaderboard.lp1.eu/api/json')
    .then(response => {
      this.post = response.data
    })
    .catch(error => {
      this.error.push(error)
    })
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
