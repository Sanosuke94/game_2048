<template>
    <div>
        <div class="plateau">
            <div v-for="(place, index) in places"
        :key="index" :nb="nb" :index="index" class="place" v-bind:style="{'width': dimension + 'px', 'height': dimension + 'px'}">
                <p class="number" v-bind:nb="place.nb">{{place.nb}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BoardJS from '@/Board.js'

export default {
    name: '@/Board.js',
    methods: {
        toast () {
            // BoardJS.helloworld()
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
        console.log(BoardJS.pions)

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
        })
    }
}
</script>

<style>
    .plateau
    {
        border: solid red;
        width: 500px;
        height: 500px;
    }

    .place
    {
        background-color: goldenrod;
        display: inline-block;
    }

    .place p.number {
        font-size: 2em;
        background-color: yellow;
        margin: 5px;
        height: 85%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .place p.number[nb="0"] {
        color: transparent;
    }
</style>
