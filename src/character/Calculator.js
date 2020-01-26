import options from "./options"

export default class Calculator {
    constructor(character) {
        this.char = character
    }

    getAttribute(index, phase) {
        let result = 7
        switch (phase) {
            case undefined:
                result += (this.char.academyAttributes || [0,0,0,0,0,0])[index]
                /* falls through */
            case "academy":
                // upbringing accepted or rejected
                let up = options.upbringings[this.char.upbringing]
                if (this.char.upbringingAccepted === "true") {
                    if (index === up?.a2) {
                        result += 2
                    } else if (index === up?.a1) {
                        result += 1
                    }
                } else if (this.char.upbringingAccepted === "false") {
                    if (index === up?.r2) {
                        result += 2
                    } else if (index === up?.r1) {
                        result += 1
                    }
                }
                /* falls through */
            case "upbringing":
                result += (this.char.environmentAttributes || [0,0,0,0,0,0])[index]
                /* falls through */
            case "environment":
                result += (options.species[this.char.species]?.attrs || 
                    this.char.speciesAttributes || [0,0,0,0,0,0])[index]
                /* falls through */
            default: // species
                result += 0
        }
        return result
    }

    getAttributes(phase) {
        let result = new Array(6)
        for (let i=0; i<result.length; i++) {
            result[i] = this.getAttribute(i, phase)
        }
        return result
    }

    getDiscipline(index, phase) {
        let result = 1
        switch (phase) {
            case undefined:
                /* falls through */
            case "careerEvents":
                result+= (this.char.academyMajorDiscipline || [0,0,0,0,0,0])[index] * 2
                result+= (this.char.academyMinorDisciplines || [0,0,0,0,0,0])[index]
                /* falls through */
            case "academy":
                result+= (this.char.upbringingDisciplines || [0,0,0,0,0,0])[index]
                /* falls through */
            case "upbringing":
                result += (this.char.environmentDisciplines || [0,0,0,0,0,0])[index]
                /* falls through */
            case "environment":
                /* falls through */
            default: // species
                result += 0
        }
        return result
    }

    getDisciplines(phase) {
        let result = new Array(6)
        for (let i=0; i<result.length; i++) {
            result[i] = this.getDiscipline(i, phase)
        }
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
                    switch (phase) {
                        case "academy":
                        case "upbringing":
                            // species talents are unavaliable after species phase
                            return false
                        default: // species
                            return this.char.species === req.id
                    }
                case "dcp":
                    return this.getDiscipline(req.id, phase) >= req.min
                default:
                    return false
            }
        })
    }

    getTalents() {
        return (this.char.speciesTalents || []).concat(
            this.char.upbringingTalent || [],
            this.char.academyTalent || [])
    }
}