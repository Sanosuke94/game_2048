<template>
  <div id="game">
    <div id="header-game">
        <p>Hi <strong>{{nickname}}</strong> ! | Score : <strong>{{ board.points }}</strong></p>
    </div>
    <div v-if="board.over">
        <p>You lost :(</p>
    </div>
    <div v-else id="board-game">
      <div v-for="rows in board.squares" class="rows">
        <div v-for="cell in rows" :class="'cell tile'+cell">
          {{ cell == 0 ? '' : cell }}
        </div>
      </div>
    </div>
    <p><button type="button" @click="restart">Restart</button></p>
  </div>
</template>

<script>

import board from '@/utils/board.js'
import store from '@/utils/store.js'

export default {
  name: 'Game',
  computed: {
    board() {
      return store.getters.getBoard
    },
    nickname() {
      return store.getters.getNickname
    }
  },
  methods: {
     onKeyDown: function (event) {
          if (event.keyCode >= 37 && event.keyCode <= 40) {
            switch (event.keyCode) {
              case 37:
                this.board.move('left')
                break;
              case 38:
                this.board.move('up')
                break;
              case 39:
                this.board.move('right')
                break;
              case 40:
                this.board.move('down')
                break;
            }
            this.$forceUpdate()
            store.commit('setBoard', this.board)
          }
     },
     restart: function() {
       this.board.init(4)
       this.$forceUpdate()
     }
  },
  data () {
    return {
      board: {}
    }
  },
  created() {
      this.board = board
      this.board.init(4)
      store.commit('setBoard', this.board)
      window.addEventListener('keydown', this.onKeyDown)
  }
}
</script>

<style>
#game {
    text-align: center;
}

#board-game {
    display: inline-block;
    padding: 2px;
    margin: 20px auto;
    background-color: #baa;
    border-radius: 7px;
}

.rows {
    font-size: 0;
    display:inline-block;
    vertical-align: top;
}

.cell {
    display: block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #766;
    font-weight: bold;
    background-color: #dcb;
    border-radius: 5px;
    text-align: center;
    margin: 2px;
}

.cell.tile0 {
  background-color: #dcb;
}

.cell.tile2 {
  background-color: #eee;
}

.cell.tile4 {
  background-color: #eec;
}

.cell.tile8 {
  color: #ffe;
  background-color: #fb8;
}

.cell.tile16 {
  color: #ffe;
  background-color: #f96;
}

.cell.tile32 {
  color: #ffe;
  background-color: #f75;
}

.cell.tile64 {
  color: #ffe;
  background-color: #f53;
}

.cell.tile128 {
  color: #ffe;
  background-color: #ec7;
  font-size: 45px;
}

.cell.tile256 {
  color: #ffe;
  background-color: #ec6;
  font-size: 45px;
}

.cell.tile512 {
  color: #ffe;
  background-color: #ec5;
  font-size: 45px;
}

.cell.tile1024 {
  color: #fff;
  background-color: #ec3;
  font-size: 35px;
}

.cell.tile2048 {
  color: #fff;
  background-color: #ec2;
  font-size: 35px;
}
</style>