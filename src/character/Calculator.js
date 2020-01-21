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

    getTraits() {
        let result = []
        result.push(options.species[this.char.species].name)
    }
    
    isTalentAvailable(reqs) {
        if (!reqs || reqs.length === 0) {
            return true
        }
        return !reqs.some( req => {
            switch (req.type) {
                case "spc":
                    return this.char.species !== req.id 
                case "dcp":
                    return this.getDiscipline(req.id) < req.min
                default:
                    return false
            }
        })
    }

}