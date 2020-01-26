import React from 'react';

export default class Academy extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let academy = this.props.possibleValues.map( (aca, i) => {
            return (
                <label key={i}>
                    <input type="radio" name={this.props.fieldName} value={i}
                        checked={this.props.value === i}
                        onChange={this.onChange} />
                    {aca.name}
                </label>
            )
        })

        return (<React.Fragment>
            <div className="card-label">Academy: </div>
            <div>
                {academy}
                <button type="button" name="rollForAcademy"
                    onClick={this.onClickRoll}> Roll </button>
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }

    onClickRoll = () => {
        let roll = Math.floor(Math.random() * 6) + 1
        let value = this.props.possibleValues.findIndex( e => e.rolls.includes(roll))
        this.props.onChange(this.props.fieldName, value)
    }
}
