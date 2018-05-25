import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Game from '@/components/game/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/play',
      name: 'Game',
      component: Game
    }
  ]
})
