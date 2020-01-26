import React from 'react';

export default class Disciplines extends React.Component {
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
            <div className="card-label">{this.props.label || "Disciplines:"} </div>
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
