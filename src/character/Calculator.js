import options from "./options"

export default class Calculator {
    constructor(character) {
        this.char = character
    }

    getAttribute(index) {
        return 7 + this.char.speciesAttr[index]
    }

    getDiscipline(index, phase) {
        let result = 1
        if (phase === "species" || this.char.environmentDisciplines === undefined) return result
        result += this.char.environmentDisciplines[index]
        if (phase === "upbringing") return result

        return result
    }

    getTraits() {
        let result = []
        result.push(options.species[this.char.species].name)
    }
    
    isTalentAvailable(reqs, phase) {
        if (!reqs || reqs.length === 0) {
            return true
        }
        return reqs.some( req => {
            switch (req.type) {
                case "spc":
                    return phase !== "upbringing" && this.char.species === req.id 
                case "dcp":
                    return this.getDiscipline(req.id, phase) >= req.min
                default:
                    return false
            }
        })
    }

}