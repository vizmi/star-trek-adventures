import React from 'react';

export default class Talents extends React.Component {
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
