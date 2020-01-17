export default class Character {
    constructor(id, name, era, species, speciesAttr) {
        this.id = id
        this.name = name
        this.era = era
        this.species = species
        this.speciesAttr = speciesAttr
        this.speciesTalents = []
        this.talents = []
    }

    toString() {
        return JSON.stringify(this)
    }
}
