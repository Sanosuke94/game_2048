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

        /*
        if (size < 2 || size > 6) {
            alert ('!!')
            size = 4
        }
        */
        
        this.size = size
        this.pions = []
        this.score = 0
        this.mouvs = 0

        this.nbPositions = (this.size * this.size)

        console.log('localstorage')
        console.log(localStorage)
        console.log(typeof(localStorage.getItem('pions')))

        if (typeof(localStorage.getItem('pions') == 'string') && localStorage.getItem('pions') != null) {
            this.pions = JSON.parse(localStorage.getItem('pions'))
            this.score = localStorage.getItem('score')
            this.mouvs = localStorage.getItem('mouvs')
            
        }

        else {
            console.log('pas de sauvegarde = on part de zero')

            let i = 1
            let u = 1
            while(i <= this.size)
            {
                u = 1
                while (u <= this.size) {
                    this.pions.push({'index' : (i - 1), 'x' : i, 'y' : u, 'nb' : 0, 'fusionnable' : true})
                    u++
    
                }
                
                i++
            }
    
             console.log(this.pions)
    
            this.ajoutPion()
            this.ajoutPion()

        }

    }

    /**
     * Ajout un pion sur une place libre au hasard
     */
    ajoutPion()
    {
        let placesLibres = this.getPlacesLibres()

        if (placesLibres.length > 0) {
            console.log("places libres : " + placesLibres.length)
            // choper l'index de la position correspondant à une choisie aléatoirement parmi celles qui sont libres
   
            // console.log('intervale : 0, ' + (placesLibres.length - 1))
            let randomIndex = this.getChiffreRandom(0, (placesLibres.length - 1))

            let x = placesLibres[randomIndex].x
            let y = placesLibres[randomIndex].y

            this.setPlaceNb(x, y, 2)
            // console.log('nouveau pion : ' + x + ':' + y)        
            
        } else {
            alert('fin')

        }
    }

    getPlacesLibres()
    {
        let libres = this.pions.filter(pion => pion.nb == 0)
        let strlibres = 'Libres :'
        libres.forEach(element => {
            strlibres = strlibres + element.x + ':' + element.y + ', '
        });
        // console.log(strlibres)

        return libres
    }

    getPlacesPrises()
    {
        let prises = this.pions.filter(pion => pion.nb != 0)
        let strlibres = 'Prises :'
        prises.forEach(element => {
            strlibres = strlibres + element.x + ':' + element.y + ', '
        });
        // console.log(strlibres)

        return prises
    }

    getPlaceStatut(x, y)
    {
        // console.log('TEST ' + x + ':' + y)
        let index = this.getPlaceIndex(x, y)
        // console.log("type")
        // console.log(typeof(index))
        if (typeof(index) == 'number') { // la place existe, on a son index
            // console.log("index n'est pas false mais il est " + typeof(index) + " et sa veleur est : " + index)
            if (this.pions[index].nb == 0) { // l'attribut nb est à 0 = il est libre
                return true;

            } else { // l'attribut nb n'est pas à 0
                // console.log("pas libre car nb = " + this.pions[index].nb)
                return false;

            }

        } else { // pas de place, pas d'index, pas de chocolats
            // console.log('pas libre car index indisponible')
            return false;

        }
    }

    getPlaceIndex(x, y, places = this.pions)
    {
        let index = this.pions.findIndex(place => place.x == x && place.y == y)
        // console.log("GET INDEX POUR " + x + ":" + y)
        // console.log(index)
        if (typeof(index) == 'number' && index >= 0 && index <= (this.pions.length - 1)) {
            //index = this.pions.filter(place => place.x == x && place.y == y)[0].index

            // console.log("index : " + index)
            return index;

        } else {
            // console.log('ah ! ' + index)
            return false

        }
    }

    getPlaceNb(x, y) {
        let index = this.getPlaceIndex(x, y)
        if (typeof(index) == 'number') {
            return this.pions[index].nb

        } else {
            return false;

        }
    }

    setPlaceNb(x, y, newNb) {
        let index = this.getPlaceIndex(x, y)
        if (typeof(index) == 'number') {
            this.pions[index].nb = newNb

        }
    }

    getFusionnable(x, y) {
        let index = this.getPlaceIndex(x, y)
        if (typeof(index) == 'number') {
            return this.pions[index].fusionnable

        } else {
            return false;
            
        }
    }

    setFusionnable(x, y, newFusionnable = true) {
        let index = this.getPlaceIndex(x, y)
        if (typeof(index) == 'number') {
            this.pions[index].fusionnable = newFusionnable

        }

    }

    fusionnerPlaces(x1, y1, x2, y2) {
        this.setPlaceNb(x1, y1, 0)
        let newNb = (this.getPlaceNb(x2, y2) * 2)
        this.setPlaceNb(x2, y2, newNb)
        this.score = this.score + newNb
        console.log('score : ' + this.score)

    }

    sortByYDesc(a,b) {
        if (a.y < b.y) {
            return -1;

        }

        if (a.y > b.y) {
            return 1;

        }
        this.ajoutPion()
        return 0;

    }

    changerPosition(oldX, oldY, newX, newY) {
        let nb = this.getPlaceNb(oldX, oldY)
        this.setPlaceNb(oldX, oldY, 0)
        this.setPlaceNb(newX, newY, nb)
        // console.log("changement de valeur pour " + newX + ":" + newY + " - nb = " + nb)

    }

    deplacer(sens) {

        if (sens == 'h')
        {

            let liste = this.getPlacesPrises().sort(function(a,b){
                if (a.x > b.x) {
                    return 1
                } else if (a.x < b.x) {
                    return -1
                } else {
                    return 0
                }
            })
            let deplacement = false
            // console.log(liste[0].nb);

            liste.forEach(element => {
                let libre = true
                let oldPosX = element.x
                let oldPosY = element.y
                let currentPosX = element.x
                let currentPosY = element.y
                let newPosX = element.x
                let newPosY = element.y
                let currentNb = this.getPlaceNb(element.x, element.y)

                this.setFusionnable(element.x, element.y, true)
                // Bon alors là ce qu'on va faire c'est qu'on va placer le "pion" le plus à droite possible

                while (libre == true) {
                    libre = this.getPlaceStatut((currentPosX - 1), currentPosY)
                    // console.log(currentPosX + ":" + (currentPosY - 1) + " libre ? " + libre)
                    if (libre == true) {
                        // console.log('oui')

                        newPosX = newPosX - 1
                        currentPosX = currentPosX - 1

                    } // console.log(libre)

                }
                // console.log("sortie du while. position retenue " + newPosX + ":" + newPosY)
                // et la on change la position
                this.changerPosition(oldPosX, oldPosY, newPosX, newPosY)
                // console.log(oldPosX + ":" + oldPosY + " > " + newPosX + ":" + newPosY + " " + this.getPlaceStatut(1, 1) + " " + this.pions[0].nb)

                if (oldPosX != newPosX || oldPosY != newPosY) {
                    deplacement = true
                }

                // on vérifie si la case d'après n'aurait pas le même chiffre
                // console.log(newPosX + ":" + (newPosY + 1) + " est-il fusionnable ?")
                // console.log(this.getFusionnable(newPosX, (newPosY + 1)))
                if (
                    this.getPlaceNb((newPosX - 1), newPosY ) == currentNb && this.getFusionnable((newPosX - 1), newPosY) == true
                )
                {
                    this.fusionnerPlaces(newPosX, newPosY, (newPosX - 1), newPosY )
                    // console.log("fuuuuuuusion")
                    this.setFusionnable((newPosX - 1), newPosY, false)

                }

            });

            if (deplacement == true) {
                this.mouvs++
                this.ajoutPion()

            }
        }

        if (sens == 'b')
        {

            let liste = this.getPlacesPrises().sort(function(a,b){
                if (a.x < b.x) {
                    return 1
                } else if (a.x > b.x) {
                    return -1
                } else {
                    return 0
                }
            })
            let deplacement = false
            // console.log(liste[0].nb);

            liste.forEach(element => {
                let libre = true
                let oldPosX = element.x
                let oldPosY = element.y
                let currentPosX = element.x
                let currentPosY = element.y
                let newPosX = element.x
                let newPosY = element.y
                let currentNb = this.getPlaceNb(element.x, element.y)

                this.setFusionnable(element.x, element.y, true)
                // Bon alors là ce qu'on va faire c'est qu'on va placer le "pion" le plus à droite possible

                while (libre == true) {
                    libre = this.getPlaceStatut((currentPosX + 1), currentPosY)
                    // console.log(currentPosX + ":" + (currentPosY - 1) + " libre ? " + libre)
                    if (libre == true) {
                        // console.log('oui')

                        newPosX = newPosX + 1
                        currentPosX = currentPosX + 1

                    } // console.log(libre)

                }
                // console.log("sortie du while. position retenue " + newPosX + ":" + newPosY)
                // et la on change la position
                this.changerPosition(oldPosX, oldPosY, newPosX, newPosY)
                // console.log(oldPosX + ":" + oldPosY + " > " + newPosX + ":" + newPosY + " " + this.getPlaceStatut(1, 1) + " " + this.pions[0].nb)

                if (oldPosX != newPosX || oldPosY != newPosY) {
                    deplacement = true
                }

                // on vérifie si la case d'après n'aurait pas le même chiffre
                // console.log(newPosX + ":" + (newPosY + 1) + " est-il fusionnable ?")
                // console.log(this.getFusionnable(newPosX, (newPosY + 1)))
                if (
                    this.getPlaceNb((newPosX + 1), newPosY ) == currentNb && this.getFusionnable((newPosX - 1), newPosY) == true
                )
                {
                    this.fusionnerPlaces(newPosX, newPosY, (newPosX + 1), newPosY )
                    // console.log("fuuuuuuusion")
                    this.setFusionnable((newPosX + 1), newPosY, false)

                }

            });

            if (deplacement == true) {
                this.ajoutPion()
                this.mouvs++

            }
        }

        if (sens == 'g')
        {

            let liste = this.getPlacesPrises().sort(function(a,b){
                if (a.x < b.x) {
                    return 1
                } else if (b.x < a.x) {
                    return -1
                } else {
                    return 0
                }
            })
            let deplacement = false
            // console.log(liste[0].nb);

            liste.forEach(element => {
                let libre = true
                let oldPosX = element.x
                let oldPosY = element.y
                let currentPosX = element.x
                let currentPosY = element.y
                let newPosX = element.x
                let newPosY = element.y
                let currentNb = this.getPlaceNb(element.x, element.y)

                this.setFusionnable(element.x, element.y, true)
                // Bon alors là ce qu'on va faire c'est qu'on va placer le "pion" le plus à droite possible

                while (libre == true) {
                    libre = this.getPlaceStatut(currentPosX, (currentPosY - 1))
                    // console.log(currentPosX + ":" + (currentPosY - 1) + " libre ? " + libre)
                    if (libre == true) {
                        // console.log('oui')

                        newPosY = newPosY - 1
                        currentPosY = currentPosY - 1

                    } // console.log(libre)

                }
                // console.log("sortie du while. position retenue " + newPosX + ":" + newPosY)
                // et la on change la position
                this.changerPosition(oldPosX, oldPosY, newPosX, newPosY)
                // console.log(oldPosX + ":" + oldPosY + " > " + newPosX + ":" + newPosY + " " + this.getPlaceStatut(1, 1) + " " + this.pions[0].nb)

                if (oldPosX != newPosX || oldPosY != newPosY) {
                    deplacement = true
                }

                // on vérifie si la case d'après n'aurait pas le même chiffre
                // console.log(newPosX + ":" + (newPosY + 1) + " est-il fusionnable ?")
                // console.log(this.getFusionnable(newPosX, (newPosY + 1)))
                if (
                    this.getPlaceNb(newPosX, (newPosY - 1)) == currentNb && this.getFusionnable(newPosX, (newPosY - 1)) == true
                )
                {
                    this.fusionnerPlaces(newPosX, newPosY, newPosX, (newPosY - 1))
                    // console.log("fuuuuuuusion")
                    this.setFusionnable(newPosX, (newPosY - 1), false)

                }

            });

            if (deplacement == true) {
                this.ajoutPion()
                this.mouvs++
            }
        }

        if (sens == 'd')
        {

            let liste = this.getPlacesPrises().sort(function(a,b){
                if (a.y < b.y) {
                    return 1
                } else if (a.y > b.y) {
                    return -1
                } else {
                    return 0
                }
            })
            // console.log('LISTE')
            liste.forEach(element => {
                // console.log(element.x + ":" + element.y)
            });

            let deplacement = false
            // console.log(liste[0].nb);

            liste.forEach(element => {
                let libre = true
                let oldPosX = element.x
                let oldPosY = element.y
                let currentPosX = element.x
                let currentPosY = element.y
                let newPosX = element.x
                let newPosY = element.y
                let currentNb = this.getPlaceNb(element.x, element.y)

                this.setFusionnable(element.x, element.y, true)
                // Bon alors là ce qu'on va faire c'est qu'on va placer le "pion" le plus à droite possible

                while (libre == true) {
                    libre = this.getPlaceStatut(currentPosX, (currentPosY + 1))
                    // console.log("libre ?")
                    if (libre == true) {
                        // console.log('oui')

                        newPosY++
                        currentPosY++

                    } // console.log(libre)

                }

                // et la on change la position
                this.changerPosition(oldPosX, oldPosY, newPosX, newPosY)
                // console.log("position changée.")

                if (oldPosX != newPosX || oldPosY != newPosY) {
                    deplacement = true
                }

                // on vérifie si la case d'après n'aurait pas le même chiffre
                // console.log(newPosX + ":" + (newPosY + 1) + " est-il fusionnable ?")
                // console.log(this.getFusionnable(newPosX, (newPosY + 1)))
                if (
                    this.getPlaceNb(newPosX, (newPosY + 1)) == currentNb && sens == 'd' && this.getFusionnable(newPosX, (newPosY + 1)) == true
                )
                {
                    this.fusionnerPlaces(newPosX, newPosY, newPosX, (newPosY + 1))
                    // console.log("fuuuuuuusion")
                    this.setFusionnable(newPosX, (newPosY + 1), false)

                }

            });

            if (deplacement == true) {
                this.ajoutPion()
                this.mouvs++
            }
        }
        
    }

    haut() {
        this.deplacer('h')
    }

    bas() {
        this.deplacer('b')
    }

    gauche() {
        this.deplacer('g')
    }

    droite() {
        this.deplacer('d')
    }

    /**
     * 
     * @param {*} min 
     * @param {*} max 
     * 
     * Retourne un chiffre entre 1 et la taille du plateau
     */
    getChiffreRandom(min = 1, max = this.size) {

        let resultat = Math.random() * (max - min) + min;
        resultat = Math.ceil(resultat)
        return resultat
    }

    constructor (size = 4) {
        if (typeof(localStorage.getItem('size') == 'string') && localStorage.getItem('size') != null) {
            size = localStorage.getItem('size')
        }

        this.init(size)

    }

    reset(newSize = 4) {
        localStorage.clear()
        this.init(newSize)
    }
    
}

export default new Board();