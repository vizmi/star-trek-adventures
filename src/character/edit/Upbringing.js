import React from 'react';

export default class Upbringing extends React.Component {
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
        let value = this.props.possibleValues.findIndex( e => e.roll === roll)
        this.props.onChange(this.props.fieldName, value)
    }
}
