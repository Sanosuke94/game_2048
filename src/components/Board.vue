<template>
<div>
    <div id="jeu">
        <div class="plateau">
            <div v-for="(place, index) in places"
        :key="index" :nb="nb" :fusionnable="fusionnable" :index="index" class="place" v-bind:style="{'width': dimension + 'px', 'height': dimension + 'px'}">
                <p class="number" v-bind:nb="place.nb">{{place.nb}}</p>
            </div>
        </div>
    </div>
    <br />
    <div id="score">
        <p>Score : <strong>{{ score }}</strong> | Mouvements : <strong>{{ mouvs }}</strong></p>
    </div>
    Taille du plateau : <input id="number" type="number" min="2" max="6" v-bind:value="size">
    <button @click="reset">Recommencer</button>

</div>
</template>

<script>
import BoardJS from '@/Board.js'

export default {
    name: 'Board',
    methods: {
        toast () {
            // BoardJS.helloworld()
        },
        reset() {
            BoardJS.reset(document.getElementById('number').value)
            this.size = BoardJS.size
            localStorage.setItem('size', BoardJS.size)
            this.dimension = 500 / BoardJS.size
            this.places = BoardJS.pions
            this.score = BoardJS.score
            this.mouvs = BoardJS.mouvs
        }
        
    },
    data () {
        return {
            "size" : BoardJS.size,
            "dimension" : 500 / BoardJS.size,
            "places" : BoardJS.pions,
            "score" : BoardJS.score,
            "mouvs" : BoardJS.mouvs
        }
    },
    created () {
        console.log('TOAST')

        localStorage.setItem('size', BoardJS.size)

        window.addEventListener("keypress", e => {
            console.log('///////' + e.keyCode)

            if (e.keyCode == 39) {
                BoardJS.droite()
                
            }

            if (e.keyCode == 37) {
                BoardJS.gauche()

            }

            if (e.keyCode == 40) {
                BoardJS.bas()

            }

            if (e.keyCode == 38) {
                BoardJS.haut()

            }

            if (e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 40 || e.keyCode == 38) {
                localStorage.setItem('pions', JSON.stringify(BoardJS.pions))
                this.score = BoardJS.score
                localStorage.setItem('score', BoardJS.score)
                this.mouvs = BoardJS.mouvs
                localStorage.setItem('mouvs', (BoardJS.mouvs))
                console.log(localStorage)
            }

    })
    }
}
</script>

<style>
    #jeu {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .plateau
    {
        padding: 0px;
        background-color: #bbada0;
        width: 575px;
        height: 575px;
    }

    #score {
        border: solid red;
    }

    p#bonus {
        position: absolute;
    }

    .place
    {
        display: inline-flex;
    }

    @keyframes fusion {
        0% {
            transform: scale(1.025);
            -webkit-transform: scale(1.025);
        }
        100% {
            transform: scale(1);
            -webkit-transform: scale(1);
        }
    }

    .place p.number {
        font-size: 2em;
        color: white;
        background-color: #440000;
        height: 100%;
        width: 100%;
        transform: scale(0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }

    .place p.number[nb="0"] {
        background-color: rgba(238, 228, 218, 0.35);
        color: transparent;
    }

    .place p.number[nb="2"] {
        background-color: #eee4da;
        color: #776e65;
        /*animation: fusion 0.15s ease-in-out 1;*/
    }

    .place p.number[nb="4"] {
        background-color: #ede0c8;
        color: #776e65;
    }

    .place p.number[nb="8"] {
        background-color: #f2b179;
        color: #776e65;
    }

    .place p.number[nb="16"] {
        background-color: #f59563;
    }

    .place p.number[nb="32"] {
        background-color: #f67c5f;
    }

    .place p.number[nb="64"] {
        background-color: #f65e3b;
    }

    .place p.number[nb="128"] {
        background-color: #edcf72;
        color: #776e65;
    }

    .place p.number[nb="256"] {
        background-color: #edcc61;
        color: #776e65;
    } 

    .place p.number[nb="512"] {
        background-color: #edc53f;
        color: #776e65;
    } 

    .place p.number[nb="1024"] {
        background-color: #edc53f;
        color: #776e65;
    } 

    .place p.number[nb="2048"] {
        background-color: #edc22e;
    } 

     

</style>
