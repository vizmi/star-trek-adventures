export default class Character {
    constructor(id, name, era, species) {
        this.id = id
        this.name = name
        this.era = era
        this.species = species

        this.speciesAttributes = undefined
        this.speciesTalents = undefined
        this.environment = undefined
        this.anotherSpecies = undefined
        this.environmentAttributes = undefined
        this.environmentValue = undefined
    }
}
