export default class Character {
    constructor(id, name, era, species) {
        this.id = id
        this.name = name
        this.era = era
        this.species = species
    }

    toString() {
        return JSON.stringify(this)
    }
}
