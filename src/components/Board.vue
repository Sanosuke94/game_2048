<template>
<div>
    <div id="jeu">
        <div class="plateau">
            <div v-for="(place, index) in places"
        :key="index" :nb="nb" :index="index" class="place" v-bind:style="{'width': dimension + 'px', 'height': dimension + 'px'}">
                <p class="number" v-bind:nb="place.nb">{{place.nb}}</p>
            </div>
        </div>
    </div>
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
            BoardJS.reset()
            this.places = BoardJS.pions
        }
        
    },
    data () {
        return {
            "dimension" : 500 / BoardJS.size,
            "places" : BoardJS.pions
        }
    },
    created () {
        console.log('TOAST')

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

    .place
    {
        display: inline-flex;
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
