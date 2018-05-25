<template >
  <div id="welcome">
    <input v-model="nickname" placeholder="Nickname (3 chars min)" autofocus>
    <button @click="save">Ok</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import store from '@/utils/store.js'

export default {
  name: "Nickname",
  methods: {
    save() {
      if (this.nickname.length > 3 && this.nickname.length < 50) {
        store.commit('setNickname', this.nickname)
        this.$router.push({path: '/play'})
        this.$router.forward()
      }
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