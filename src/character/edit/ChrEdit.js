import React from 'react';

import options from '../options'
import chrs from '../testChars'
import Character from '../Character'
import Calculator from '../Calculator'

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
        console.log("reset dependencies", reset)
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
        this.dispalDeps = display
        console.log("display dependencies", display)
    }

    isHidden = (fieldName) => {
        return this.dispalDeps[fieldName].some((d) => {
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
        
        let availableSpeciesAttributes = options.species[char.species]?.attrs || 
            char.speciesAttributes || [0,0,0,0,0,0]
        
        let isSpeciesAttributesEditable = options.species[char.species]?.attrs === undefined

        let availableSpeciesTalents = []
        options.talents.forEach((t, i) => {
            if (calc.isTalentAvailable(t.reqs, "species")) {
                availableSpeciesTalents.push(i)
            }
        })
        
        let availableEnvironmentAttributes = []
        switch (char.environment) {
            case undefined:
                break
            case 0:
                availableSpeciesAttributes.forEach((t,i) => {
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
            if (calc.isTalentAvailable(t.reqs, "upbringing")) {
                availableUpbringingTalents.push(i)
            }

        })
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
                        values={availableSpeciesAttributes}
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
                        value={char.upbringingFocus || ""}
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


class Era extends React.Component {
    render = () => {
        let eras = this.props.eras.map((era, i) =>
            (<label key={i}>
                <input type="radio" name="era" value={i}
                    checked={this.props.value === i}
                    onChange={this.onChange} />
                {era.name}
            </label>)
        )

        return (<React.Fragment>
            <div className="card-label">Era of Play: </div>
            <div>{eras}</div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }
}


class Name extends React.Component {
    render = () => (
        <React.Fragment>
            <div className="card-label">Name: </div>
            <input type="text" name="name" value={this.props.value} onChange={this.onChange}/>
        </React.Fragment>
    )
    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}


class Species extends React.Component {
    render = () => {
        if (this.props.hidden) return null

        let species = this.props.possibleValues.map(s => {
            return (
                <label key={s}>
                    <input type="radio" name={this.props.fieldName} value={s}
                        disabled={this.props.unavailable === s}
                        checked={this.props.value === s}
                        onChange={this.onChange} />
                    {this.props.species[s].name}
                </label>
            )
        })

        return (<React.Fragment>
            <div className="card-label">Species: </div>
            <div>
                {species}
                <button type="button" name="rollForSpecies"
                    onClick={this.onClickRoll}> Roll </button>
            </div>
        </React.Fragment>)
    }
   
    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }

    onClickRoll = () => {
        let unavailable = this.props.unavailable || []
        do {
            let roll = Math.floor(Math.random() * 20) + 1
            let spcIdx = 0
            while (roll > this.props.rolls[spcIdx]) spcIdx++
            var value = this.props.possibleValues[spcIdx]
        } while (unavailable === value)
        this.props.onChange(this.props.fieldName, value)
    }
}


class Attributes extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let remaining = this.props.choices - this.props.values.reduce((t, c) => (t + c), 0)
        let attibutes = this.props.values.map( (attr, i) => (
            <label key={i}>
                <input type="checkbox" name={this.props.fieldName} value={i}
                    disabled={!this.props.editable ||
                        (!this.props.availableValues.includes(i)) ||
                        (remaining < 1 && attr === 0)}
                    checked={attr === 1}
                    onChange={this.onChange}/>
                {this.props.possibleValues[i]}
            </label>
        ))
        let choose = remaining > 0 ? <span className="info"> Choose {remaining} more </span> : null

        return (<React.Fragment>
            <div className="card-label">Attributes: </div>
            <div>
                {attibutes}
                {choose}
            </div>
        </React.Fragment>)

    }

    onChange = (event) => {
        let values = this.props.values
        let index = parseInt(event.target.value)
        values[index] = values[index] === 0 ? 1 : 0
        this.props.onChange(event.target.name, values)
    }
}


class Talents extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let remaining = this.props.choices - this.props.values.length
        let talents = this.props.possibleValues.map( (t,i) => 
            <label key={i}>
            <input type="checkbox" name={this.props.fieldName} value={i}
                disabled={!this.props.availableValues.includes(i) ||
                    (remaining < 1 && !this.props.values.includes(i))}
                checked={this.props.values.includes(i)}
                onChange={this.onChange}/>
            {t.name}
        </label>)
        let choose = remaining > 0 ? <span className="info"> Choose {remaining} more </span> : null
        return (<React.Fragment>
            <div className="card-label"> Talents: </div>
            <div>
                {talents}
                {choose}
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        let values = this.props.values
        let value = parseInt(event.target.value)
        let index = values.indexOf(value)
        if (index < 0) {
            values.push(value)
        } else {
            values.splice(index, 1)
        }
        this.props.onChange(event.target.name, values)
    }
}


class Environment extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let envs = this.props.possibleValues.map( (env, i) => {
            return (
                <label key={i}>
                    <input type="radio" name={this.props.fieldName} value={i}
                        checked={this.props.value === i}
                        onChange={this.onChange} />
                    {env.name}
                </label>
            )
        })

        return (<React.Fragment>
            <div className="card-label">Environment: </div>
            <div>
                {envs}
                <button type="button" name="rollForEnvironment"
                    onClick={this.onClickRoll}> Roll </button>
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }

    onClickRoll = () => {
        let roll = Math.floor(Math.random() * 6) + 1
        console.log("roll", roll)
        let value = this.props.possibleValues.findIndex( e => e.roll === roll)
        console.log("name", this.props.fieldName)
        console.log("value", value)
        this.props.onChange(this.props.fieldName, value)
    }
}


class Value extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        return <React.Fragment>
            <div className="card-label">Value: </div>
            <input type="text" name={this.props.fieldName} value={this.props.value} onChange={this.onChange}/>
            <div style={{textAlign:"right"}}>Examples: </div>
            {this.props.examples}
        </React.Fragment>
    }
    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}


class Disciplines extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let remaining = this.props.choices - this.props.values.reduce((t, c) => (t + c), 0)
        let disciplines = this.props.values.map( (dsc, i) => (
            <label key={i}>
                <input type="checkbox" name={this.props.fieldName} value={i}
                    disabled={!this.props.editable ||
                        (!this.props.availableValues.includes(i)) ||
                        (remaining < 1 && dsc === 0)}
                    checked={dsc === 1}
                    onChange={this.onChange}/>
                {this.props.possibleValues[i]}
            </label>
        ))
        let choose = remaining > 0 ? <span className="info"> Choose {remaining} more </span> : null
        return (<React.Fragment>
            <div className="card-label">Disciplines: </div>
            <div>
                {disciplines}
                {choose}
            </div>
        </React.Fragment>)

    }

    onChange = (event) => {
        let values = this.props.values
        let index = parseInt(event.target.value)
        values[index] = values[index] === 0 ? 1 : 0
        this.props.onChange(event.target.name, values)
    }
}


class Upbringing extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let upbs = this.props.possibleValues.map( (upb, i) => {
            return (
                <label key={i}>
                    <input type="radio" name={this.props.fieldName} value={i}
                        checked={this.props.value === i}
                        onChange={this.onChange} />
                    {upb.name}
                </label>
            )
        })

        return (<React.Fragment>
            <div className="card-label">Upbringing: </div>
            <div>
                {upbs}
                <button type="button" name="rollForUpbringing"
                    onClick={this.onClickRoll}> Roll </button>
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }

    onClickRoll = () => {
        let roll = Math.floor(Math.random() * 6) + 1
        console.log("roll", roll)
        let value = this.props.possibleValues.findIndex( e => e.roll === roll)
        console.log("name", this.props.fieldName)
        console.log("value", value)
        this.props.onChange(this.props.fieldName, value)
    }
}


class UpbringingAccepted extends React.Component {
    render = () => {
        if (this.props.hidden) return null

        return (<React.Fragment>
            <div className="card-label">Is accepted? </div>
            <div>
                <label>
                    <input type="radio" name={this.props.fieldName} value="true"
                        checked={this.props.value === "true"}
                        onChange={this.onChange} />
                    Accepted
                </label>
                <label>
                    <input type="radio" name={this.props.fieldName} value="false"
                        checked={this.props.value === "false"}
                        onChange={this.onChange} />
                    Rejected
                </label>
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}


class Focus extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        return <React.Fragment>
            <div className="card-label">Focus: </div>
            <input type="text" name={this.props.fieldName} value={this.props.value} onChange={this.onChange}/>
            <div style={{textAlign:"right"}}>Examples: </div>
            {this.props.examples}
        </React.Fragment>
    }
    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}
