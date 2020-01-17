import React from 'react';

import options from './../options'
import chrs from './../testChars'
import Character from './../Character'
import Calculator from '../Calculator'

export default class ChrEdit extends React.Component {
    // constructors
    constructor(props) {
        super(props)

        let id = parseInt(props.match.params.id)
        let c = chrs.find(char => char.id === id) || new Character(-1, "")

        this.state = {char: c} 
    }

    // event handlers
    onChangeName = (event) => {
        let value = event.target.value
        console.log("name", value)
        this.setState(prev => ({char: { ...prev.char, name: value }}))
    }

    onChangeEra = (event) => {
        let value = parseInt(event.target.value)
        console.log("era", value)

        if (!options.eras[value].species.includes(this.state.char.species)) {
            this.changeSpeciesRelated(undefined)
        }

        this.setState(prev => ({char: { ...prev.char,
            era: value,
        }}))
    }

    onChangeSpecies = (event) => {
        let value = parseInt(event.target.value)
        console.log("species", value)
        this.changeSpeciesRelated(value);
    }

    onClickRollSpecies = () => {
        // roll for species
        let roll = Math.floor(Math.random() * 20) + 1
        console.log("roll", roll)
        let era = this.state.char.era
        let spcIdx = 0
        let rolls = options.speciesRoll[era]
        while (roll > rolls[spcIdx]) {
            spcIdx++
        }
        let value = options.eras[era].species[spcIdx]
        console.log("species", value)

        this.changeSpeciesRelated(value);
    }

    onChangeSpeciesAttr = (event) => {
        let speciesAttr = this.state.char.speciesAttr
        let i = parseInt(event.target.value)
        speciesAttr[i] = ((speciesAttr[i]) === 0 ? 1 : 0)
        this.setState(prev => ({ char: {...prev.char,
            speciesAttr: speciesAttr
        }}));
    }

    onChangeSpeciesTalent = (event) => {
        let value = parseInt(event.target.value)
        let name = event.target.name
        let newTalents = this.state.char[name]

        let i = newTalents.indexOf(value)
        if (i < 0) {
            newTalents.push(value)
        } else {
            newTalents.splice(i, 1)
        }
        console.log(name, newTalents)
        this.setState(prev => ({ char: {...prev.char,
            [name]: newTalents
        }}));
    }

    // event handler helpers
    changeSpeciesRelated(value) {
        let newSpeciesAttr = this.state.char.speciesAttr;
        if (value === undefined || options.species[value].attrs !== undefined) {
            newSpeciesAttr = undefined
        }
        else {
            newSpeciesAttr = [0, 0, 0, 0, 0, 0]
        }

        this.setState(prev => ({ char: {...prev.char,
            species: value,
            speciesAttr: newSpeciesAttr,
            speciesTalents: []
        }}));
    }

    // render
    render = () => {
        let char = this.state.char
        console.log(char)
        let calc = new Calculator(char)
        return (
            <div className="border">
                <div className="header-background">
                    <div className="header-text">
                        Basic Info
                    </div>
                </div>
                <div className="form-grid">
                    {this.renderName(calc)}
                    {this.renderEras(calc)}
                </div>
                <div className="header-background">
                    <div className="header-text">
                        Species
                    </div>
                </div>
                <div className="form-grid">
                    {this.renderSpecies(calc)}
                    {this.renderSpeciesAttr(calc)}
                    {this.renderSpeciesTalents(calc)}
                </div>
            </div>
        )
    }
    
    renderName = (calc) => (
        <React.Fragment>
            <div className="card-label">Name: </div>
            <input type="text" name="name" value={calc.char.name} onChange={this.onChangeName}/>
        </React.Fragment>
    )
    
    renderEras = (calc) => {
        let eras = options.eras.map( (era, i) =>
            (<label key={i}>
                <input type="radio" name="era" value={i}
                    checked={calc.char.era === i}
                    onChange={this.onChangeEra} />
                {era.name}
            </label>)
        )

        return (<React.Fragment>
            <div className="card-label">Era of Play: </div>
            <div>{eras}</div>
        </React.Fragment>)
    }

    renderSpecies = (calc) => {
        if (calc.char.era === undefined) {
            return
        }

        let species = options.eras[calc.char.era].species.map( (species) => {
            return (
                <label key={species}>
                    <input type="radio" name="species" value={species}
                        checked={calc.char.species === species}
                        onChange={this.onChangeSpecies} />
                    {options.species[species].name}
                </label>
            )
        })

        return (<React.Fragment>
            <div className="card-label">Species: </div>
            <div>
                {species}
                <button type="button" name="rollForSpecies"
                    onClick={this.onClickRollSpecies}> Roll </button>
            </div>
        </React.Fragment>)
    }

    renderSpeciesAttr = (calc) => {
        let sp = calc.char.species
        if (sp === undefined) {
            return
        }
        let speciesAttr = calc.char.speciesAttr 
        let allDisabled = false
        if (speciesAttr === undefined) {
            allDisabled = true
            speciesAttr = options.species[sp].attrs
        }
        let remaining = 3 - speciesAttr.reduce((t, c) => (t + c), 0) 
        let spa = options.attributes.map( (attr, i) => (
            <label key={i}>
                <input type="checkbox" name="speciesAttr" value={i}
                    disabled={allDisabled || (remaining < 1 && speciesAttr[i] === 0)}
                    checked={speciesAttr[i]}
                    onChange={this.onChangeSpeciesAttr}/>
                {attr}
            </label>
        ))
        let choose = remaining > 0 ? <span className="info"> Choose {remaining} more </span> : null

        return (<React.Fragment>
            <div className="card-label">Attributes: </div>
            <div>
                {spa}
                {choose}
            </div>
        </React.Fragment>)
    }

    renderSpeciesTalents = (calc) => {
        if (calc.char.species === undefined) {
            return
        }
        let talents = calc.char.talents
        let speciesTalents = calc.char.speciesTalents
        let remaining = 2 - talents.length - speciesTalents.length
        let generalTalents = options.talents.map( (t,i) => (
            <label key={i}>
                <input type="checkbox" name="talents" value={i}
                    disabled={!calc.isTalentAvailable(t.reqs) || 
                        (remaining < 1 && !talents.includes(i))}
                    checked={talents.includes(i)}
                    onChange={this.onChangeSpeciesTalent}/>
                {t.name}
            </label>
        ))
        let specificTalents = options.species[calc.char.species].speciesTalents.map( (t,i) => (
            <label key={i}>
                <input type="checkbox" name="speciesTalents" value={i}
                    disabled={remaining < 1 && !speciesTalents.includes(i)}
                    checked={speciesTalents.includes(i)}
                    onChange={this.onChangeSpeciesTalent}/>
                {t}
            </label>
        ))
        let choose = remaining > 0 ? <span className="info"> Choose {remaining} more </span> : null

        return (<React.Fragment>
            <div className="card-label"> Talents: </div>
            <div>
                {specificTalents}
                {generalTalents}
                {choose}
            </div>
        </React.Fragment>)
    }
}
