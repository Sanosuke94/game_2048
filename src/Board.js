class Board
{
    /**
     * 
     * @param {*} size 
     * 
     * Initialise le plateau
     */
    init(size)
    {
        this.size = size
        this.pions = []

        this.nbPositions = (this.size * this.size)

        let i = 1
        let u = 1
        while(i <= this.size)
        {
            u = 1
            while (u <= this.size) {
                this.pions.push({'x' : i, 'y' : u, 'nb' : 0})
                u++

            }
            
            i++
        }

        console.log(this.pions)

        this.ajoutPion()

    }

    /**
     * Ajout un pion sur une place libre au hasard
     */
    ajoutPion()
    {
        let placesLibres = this.getPlacesLibres()

        if (placesLibres.length > 0) {
            let x = this.getChiffreRandom()
            let y = this.getChiffreRandom()

            let placeIndex = this.getPlaceIndex(x, y, placesLibres)
            this.pions[placeIndex].nb = 2
            console.log(this.pions[placeIndex])

            
            
        } else {
            console.log('FIN')

        }
    }

    getPlacesLibres()
    {
        return this.pions.filter(pion => pion.nb == 0)
    }

    getPlaceIndex(x, y, places = this.pions)
    {
        return places.findIndex(place => place.x == x && place.y == y)
    }

    /**
     * 
     * @param {*} min 
     * @param {*} max 
     * 
     * Retourne un chiffre entre 1 et la taille du plateau
     */
    getChiffreRandom() {
        let resultat = Math.random() * (this.size - 1) + 1;
        resultat = Math.ceil(resultat)
        return resultat
    }

    constructor () {
        this.init(5)
    }

    helloworld() {
        console.log('ok ça marche !')
    }
}

export default new Board();