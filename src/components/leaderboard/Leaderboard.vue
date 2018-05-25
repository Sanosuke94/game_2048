<template>
    <table>
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in this.scores" :key="index" :index="index">
          <td>{{ score.nickname.substring(0, 30) }}</td>
          <td>{{ score.score }}</td>
          <td>{{ score.time.substring(0, 30) }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import http from '@/utils/http.js'
import store from '@/utils/store.js'

export default {
    name: 'Leaderboard',
    created() {
      http
        .get('json')
        .then(response => {
          this.scores = response.data
          this.scores.forEach((element, index) => {
            element.score = Number(element.score)
          })
        })
        .catch(error => this.error = JSON.parse(error.request.response)['error'])
    },
    data() {
      return {
        nickname: null,
        score: null,
        time : null,
        scores: { nickname: '', score: '', time: '' }
      }
    }
}
</script>


