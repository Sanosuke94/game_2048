<template>
    <div>
        <div class="plateau">
            <div v-for="(place, index) in places"
        :key="index" :nb="nb" :index="index" class="place">
                <p>{{place.nb}}</p>
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
        },
        
    },
    data () {
        return {
            "places" : BoardJS.pions
        }
    },
    created () {
        console.log('TOAST')
        console.log(BoardJS.pions)
    }
}
</script>

<style>
    .plateau
    {
        width: 500px;
        height: 500px;
    }

    .place
    {
        border: solid red;
        width: 18%;
        height: 18%;
        display: inline-block;
    }
</style>
