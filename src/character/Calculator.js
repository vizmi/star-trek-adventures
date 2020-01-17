import options from "./options"

export default class Calculator {
    constructor(character) {
        this.char = character
    }

    getAttribute(index) {
        return 7 + this.char.speciesAttr[index]
    }

    getDiscipline(index) {
        return 1
    }

    getTalentNames() {
        let result = []
        result.concat(this.char.speciesTalents.map(t => options.species[this.char.species].speciesTalents[t]))
        result.concat(this.char.talents.map(t => options.talents[t].name))

        return result
    }

    getTraits() {
        let result = []
        result.push(options.species[this.char.species].name)
    }
    
    isTalentAvailable(reqs) {
        if (!reqs || reqs.length === 0) {
            return true
        }
        return !reqs.some( req => this.getDiscipline(req.dcp) < req.min)
    }

}