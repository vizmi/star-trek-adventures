import React from 'react';

export default class Environment extends React.Component {
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
        let value = this.props.possibleValues.findIndex( e => e.roll === roll)
        this.props.onChange(this.props.fieldName, value)
    }
}
