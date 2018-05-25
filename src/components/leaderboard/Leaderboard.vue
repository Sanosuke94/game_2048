<template>
  <div v-if="this.scores">
    <div>
      <h2>TOP 5 - Humans</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Rank</th>
            <th align="left">Nickname</th>
            <th>Score</th>
            <th align="right">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in this.scores.filter(element => {return -1 === element.nickname.indexOf('[AI]')})" :key="index" :index="index" :class="'rank'+(index+1)" v-if="index < 5">
            <td>{{ index + 1 }}</td>
            <td align="left">{{ score.nickname }}</td>
            <td>{{ Math.round(score.score) }}</td>
            <td align="right">{{ Math.round(score.time) }} sec</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>TOP 5 - AI</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Rank</th>
            <th align="left">Nickname</th>
            <th>Score</th>
            <th align="right">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in this.scores.filter(element => {return -1 !== element.nickname.indexOf('[AI]')})" :key="index" :index="index" :class="'rank'+(index+1)" v-if="index < 5">
            <td>{{ index + 1 }}</td>
            <td align="left">{{ score.nickname }}</td>
            <td>{{ Math.round(score.score) }}</td>
            <td align="right">{{ Math.round(score.time) }} sec</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
          this.scores = response.data.filter(element => {
            var isValid = true
            if (element.nickname === undefined || element.nickname.length < 3 || element.nickname.length > 50) {
              isValid &= false
            }
            if (element.score === undefined || isNaN(element.score) || parseInt(element.score) < 1 || parseInt(element.score) > 999999999) {
              isValid &= false
            }
            if (element.time === undefined || isNaN(element.time) || parseInt(element.time) < 1) {
              isValid &= false
            }
            return isValid
          }).sort(function(a, b) {
            return a.score - b.score;
          }).reverse()
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
