import React from 'react';

export default class Attributes extends React.Component {
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
