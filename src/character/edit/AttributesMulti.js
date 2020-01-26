import React from 'react';

export default class AttributesMulti extends React.Component {
    /*
                <input type="checkbox" name={this.props.fieldName} value={i}
                    disabled={!this.props.editable ||
                        (!this.props.availableValues.includes(i)) ||
                        (remaining < 1 && attr === 0)}
                    checked={attr === 1}
                    onChange={this.onChange}/>
    */
    render = () => {
        if (this.props.hidden) return null
        let remaining = this.props.choices - this.props.values.reduce((t, c) => (t + c), 0)
        let attibutes = this.props.values.map( (attr, i) => {
            let min = this.props.baseValues[i]
            let max = min + Math.min(this.props.maxIncrease, remaining)
            return (
            <React.Fragment  key={i}>
                <label>
                    <input type="number" name={this.props.fieldName + "|#|" + i}
                        value={this.props.baseValues[i] + attr}
                        min={min} step="1" max={max}
                        onChange={this.onChange} />
                    {this.props.possibleValues[i]}
                </label>
                <br />
                </React.Fragment>
        )})
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
        let split = event.target.name.split("|#|")
        let name = split[0]
        let index = parseInt(split[1])
        let values = this.props.values
        let value = parseInt(event.target.value) - this.props.baseValues[index]

        values[index] = value
        console.log(values, name, index, value)
        this.props.onChange(name, values)
    }
}
