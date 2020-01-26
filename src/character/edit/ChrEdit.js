import React from 'react';

import options from '../options'
import chrs from '../testChars'
import Character from '../Character'
import Calculator from '../Calculator'

import Academy from './Academy'
import Attributes from './Attributes'
import AttributesMulti from './AttributesMulti'
import Disciplines from './Disciplines'
import Environment from './Environment'
import Era from './Era'
import Focus from './Focus'
import Name from './Name'
import Species from './Species'
import Talents from './Talents'
import Upbringing from './Upbringing'
import UpbringingAccepted from './UpbringingAccepted'
import Value from './Value'


export default class ChrEdit extends React.Component {
    // constructor
    constructor(props) {
        super(props)

        let id = parseInt(props.match.params.id)
        let c = chrs.find(char => char.id === id) || new Character(-1, "")

        this.state = {char: c}

        // depedendency graph processing. There are 2 flat graphs built:
        // 1 reset graph, which contains a full list of fields depending on this field
        // 2 display graph, whic contains all parents, immediate only
        let reset = {}
        let flatten = (next) => {
            // do we have it calculated already?
            let results = reset[next]
            if (results !== undefined) {
                return results
            }
            results = []
            // find the item by parent name
            let currDep = options.dependencies.find(d => d.p === next)
            if (currDep === undefined) {
                return []
            }
            // gather all child dependencies

            currDep.c.forEach(c => {
                results.push(c)
                results.push(...flatten(c))
            })
            // thow away duplicates
            results = results.filter((r, i) => results.indexOf(r) === i)
            // save it
            reset[next] = results
            // continue upwards
            return results
        }
        // build results for all of them
        options.dependencies.forEach( d => flatten(d.p))
        // save the results
        this.resetDeps = reset
        let display = {}
        options.dependencies.forEach( d => {
            display[d.p] = []
        })
        options.dependencies.forEach( d => {
            d.c.forEach( c => {
                if (!display[c].includes(d.p)) {
                    display[c].push(d.p)
                }
            })
        })
        this.displayDeps = display
    }

    isHidden = (fieldName) => {
        if (this.displayDeps[fieldName] === undefined) {
            throw new Error("please add " + fieldName + " to options.dependencies")
        }
        return this.displayDeps[fieldName].some((d) => {
            switch (d) {
                case "anotherSpecies":
                    return this.state.char[d] === undefined &&
                        this.state.char.environment === 5
                case "speciesAttributes":
                    return this.state.char[d] === undefined &&
                        options.species[this.state.char.species]?.attrs === undefined
                default:
                    return this.state.char[d] === undefined
            }
        })
    }

    // render
    render = () => {
        let char = this.state.char
        console.log(char)
        let calc = new Calculator(char)
        
        let availableSpecies = options.eras[char.era]?.species
        let isSpeciesAttributesEditable = options.species[char.species]?.attrs === undefined
        let theSpeciesAttrs = options.species[char.species]?.attrs ||
            char.speciesAttributes || [0,0,0,0,0,0]
        
        let selectedTalents = calc.getTalents()
        let availableSpeciesTalents = []
        options.talents.forEach((t, i) => {
            if ((((char.speciesTalents || []).includes(i)) || !selectedTalents.includes(i)) &&
                calc.isTalentAvailable(t.reqs, "species")) {
                    availableSpeciesTalents.push(i)
        }})
        
        let availableEnvironmentAttributes = []
        switch (char.environment) {
            case undefined:
                break
            case 0:
                theSpeciesAttrs.forEach((t,i) => {
                    if (t === 1)
                        availableEnvironmentAttributes.push(i)
                })
                break
            case 5:
                if (char.anotherSpecies === undefined) break
                // the other species list, or all available for human raised kids
                let attrList = options.species[char.anotherSpecies]?.attrs || [1,1,1,1,1,1]
                attrList.forEach((t,i) => {
                    if (t === 1)
                        availableEnvironmentAttributes.push(i)
                })
                break
            default:
                availableEnvironmentAttributes = options.environments[char.environment].attributes
                break
        }

        let environmentValueExamples = char.species === undefined ? "" : 
            "'" + (options.species[char.species]?.exValue || "") + "', "
        environmentValueExamples +=  "'" + options.environments[char.environment]?.exValue + "'"

        let availableEnvironmentDisciplines = options.environments[char.environment]?.disciplines
        let availableUpbringingDisciplines = options.upbringings[char.upbringing]?.disciplines
        let upbringingFocusExamples = options.upbringings[char.upbringing]?.exFocuses

        let availableUpbringingTalents = []
        options.talents.forEach((t, i) => {
            if ((((char.upbringingTalent || []).includes(i)) || !selectedTalents.includes(i)) &&
                calc.isTalentAvailable(t.reqs, "upbringing")) {
                    availableUpbringingTalents.push(i)
        }})

        let academyValueExamples = options.academies[char.academy]?.exValues
        let availableAcademyMajors = options.academies[char.academy]?.majors.filter(
            (d,i)=>calc.getDiscipline(i, "careerEvents") < 3)
        let availableAcademyMinors = options.disciplines.map((d,i)=>i).filter(
            (d,i)=>calc.getDiscipline(i, "careerEvents") < 4 &&
                (char.academyMajorDiscipline||[0,0,0,0,0,0])[i] === 0)
        let academyFocusExamples = options.academies[char.academy]?.exFocuses
        let availableAcademyTalents= []
        options.talents.forEach((t, i) => {
            if ((((char.academyTalent || []).includes(i)) || !selectedTalents.includes(i)) &&
                calc.isTalentAvailable(t.reqs, "academy")) {
                    availableAcademyTalents.push(i)
        }})


        return (
            <div className="border">
                <div className="header-background">
                    <div className="header-text">
                        Basic Info
                    </div>
                </div>
                <div className="form-grid">
                    <Era eras={options.eras} value={char.era} onChange={this.onChange} />
                    <Name value={char.name || ""} onChange={this.onChange} />
                </div>
                <div className="header-background">
                    <div className="header-text">
                        Species
                    </div>
                </div>
                <div className="form-grid">
                    <Species
                        fieldName="species"
                        hidden={this.isHidden("species")}
                        possibleValues={availableSpecies}
                        species={options.species}
                        rolls={options.speciesRoll[char.era]}
                        value={char.species}
                        onChange={this.onChange} />
                    <Attributes
                        fieldName="speciesAttributes"
                        hidden={this.isHidden("speciesAttributes")}
                        possibleValues={options.attributes}
                        availableValues={options.attributes.map((a,i) => i)}
                        choices={3}
                        values={theSpeciesAttrs}
                        editable={isSpeciesAttributesEditable}
                        onChange={this.onChange} />
                    <Talents
                        fieldName="speciesTalents"
                        hidden={this.isHidden("speciesTalents")}
                        possibleValues={options.talents}
                        availableValues={availableSpeciesTalents}
                        choices={2}
                        values={char.speciesTalents || []}
                        onChange={this.onChange} />
                </div>
                <div className="header-background">
                    <div className="header-text">
                        Environment
                    </div>
                </div>
                <div className="form-grid">
                    <Environment
                        fieldName="environment"
                        hidden={this.isHidden("environment")}
                        possibleValues={options.environments}
                        value={char.environment}
                        onChange={this.onChange} />
                    <Species
                        fieldName="anotherSpecies"
                        hidden={this.isHidden("anotherSpecies") || char.environment !== 5}
                        possibleValues={availableSpecies}
                        unavailable={char.species}
                        species={options.species}
                        rolls={options.speciesRoll[char.era]}
                        value={char.anotherSpecies}
                        onChange={this.onChange} />
                    <Value
                        fieldName="environmentValue"
                        hidden={this.isHidden("environmentValue")}
                        value={char.environmentValue || ""}
                        examples={environmentValueExamples}
                        onChange={this.onChange} />
                    <Attributes
                        fieldName="environmentAttributes"
                        hidden={this.isHidden("environmentAttributes")}
                        possibleValues={options.attributes}
                        availableValues={availableEnvironmentAttributes}
                        choices={1}
                        values={char.environmentAttributes || [0,0,0,0,0,0]}
                        editable={true}
                        onChange={this.onChange} />
                    <Disciplines
                        fieldName="environmentDisciplines"
                        hidden={this.isHidden("environmentDisciplines")}
                        possibleValues={options.disciplines}
                        availableValues={availableEnvironmentDisciplines}
                        choices={1}
                        values={char.environmentDisciplines || [0,0,0,0,0,0]}
                        editable={true}
                        onChange={this.onChange} />
                </div>
                <div className="header-background">
                    <div className="header-text">
                        Upbringing
                    </div>
                </div>
                <div className="form-grid">
                    <Upbringing
                        fieldName="upbringing"
                        hidden={this.isHidden("upbringing")}
                        possibleValues={options.upbringings}
                        value={char.upbringing}
                        onChange={this.onChange} />
                    <UpbringingAccepted
                        fieldName="upbringingAccepted"
                        hidden={this.isHidden("upbringingAccepted")}
                        value={char.upbringingAccepted}
                        onChange={this.onChange} />
                    <Disciplines
                        fieldName="upbringingDisciplines"
                        hidden={this.isHidden("upbringingDisciplines")}
                        possibleValues={options.disciplines}
                        availableValues={availableUpbringingDisciplines}
                        choices={1}
                        values={char.upbringingDisciplines || [0,0,0,0,0,0]}
                        editable={true}
                        onChange={this.onChange} />
                    <Focus
                        fieldName="upbringingFocus"
                        hidden={this.isHidden("upbringingFocus")}
                        values={char.upbringingFocus || []}
                        examples={upbringingFocusExamples}
                        onChange={this.onChange} />
                    <Talents
                        fieldName="upbringingTalent"
                        hidden={this.isHidden("upbringingTalent")}
                        possibleValues={options.talents}
                        availableValues={availableUpbringingTalents}
                        choices={1}
                        values={char.upbringingTalent || []}
                        onChange={this.onChange} />
                </div>
                <div className="header-background">
                    <div className="header-text">
                        Academy
                    </div>
                </div>
                <div className="form-grid">
                    <Academy
                        fieldName="academy"
                        hidden={this.isHidden("academy")}
                        possibleValues={options.academies}
                        value={char.academy}
                        onChange={this.onChange} />
                    <Value
                        fieldName="academyValue"
                        hidden={this.isHidden("academyValue")}
                        value={char.academyValue || ""}
                        examples={academyValueExamples}
                        onChange={this.onChange} />
                    <AttributesMulti
                        fieldName="academyAttributes"
                        hidden={this.isHidden("academyAttributes")}
                        possibleValues={options.attributes}
                        choices={3}
                        maxIncrease={2}
                        values={char.academyAttributes || [0,0,0,0,0,0]}
                        baseValues={calc.getAttributes("academy")}
                        onChange={this.onChange}
                    />
                    <Disciplines
                        label="Major:"
                        fieldName="academyMajorDiscipline"
                        hidden={this.isHidden("academyMajorDiscipline")}
                        possibleValues={options.disciplines}
                        availableValues={availableAcademyMajors}
                        choices={1}
                        values={char.academyMajorDiscipline || [0,0,0,0,0,0]}
                        editable={true}
                        onChange={this.onChange} />
                    <Disciplines
                        label="Minors:"
                        fieldName="academyMinorDisciplines"
                        hidden={this.isHidden("academyMinorDisciplines")}
                        possibleValues={options.disciplines}
                        availableValues={availableAcademyMinors}
                        choices={2}
                        values={char.academyMinorDisciplines || [0,0,0,0,0,0]}
                        editable={true}
                        onChange={this.onChange} />
                    <Focus
                        fieldName="academyFocus"
                        hidden={this.isHidden("academyFocus")}
                        count={3}
                        values={char.academyFocus || []}
                        examples={academyFocusExamples}
                        onChange={this.onChange} />
                    <Talents
                        fieldName="academyTalent"
                        hidden={this.isHidden("academyTalent")}
                        possibleValues={options.talents}
                        availableValues={availableAcademyTalents}
                        choices={1}
                        values={char.academyTalent || []}
                        onChange={this.onChange} />
                </div>
                
            </div>
        )
    }

    onChange = (name, value) => {
        this.setState(prev => ({char: { ...prev.char, [name]: value }}))
        this.resetDeps[name].forEach( d => {
            this.setState(prev => ({char: { ...prev.char, [d]: undefined }}))
        })
    }
}

