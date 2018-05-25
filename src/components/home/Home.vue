<template >
  <div id="welcome">
    <input v-model="nickname" placeholder="Nickname"/>
    <button @click="save" type="button">Ok</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import store from '@/utils/store.js'

export default {
  name: "Nickname",
  methods: {
    save() {
      store.commit('setNickname', this.nickname)
      this.$router.push({path: '/play'})
      this.$router.forward()
    }
  },
  data() {
    return {
      error: '',
      nickname: ''
    }
  }
}
</script>