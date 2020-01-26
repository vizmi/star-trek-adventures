import React from 'react';

export default class Species extends React.Component {
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
