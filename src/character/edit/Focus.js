import React from 'react';

export default class Focus extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        let inputNr = []
        for (let i = 0; i < (this.props.count || 1); i++) {
            inputNr.push(i)
        }
        let input = inputNr.map(i => (
            <input
                key={i}
                type="text"
                name={this.props.fieldName + "|#|" + i}
                value={this.props.values[i] || ""}
                onChange={this.onChange}/>
        ))

        return <React.Fragment>
            <div className="card-label">Focus: </div>
            <div>{input}</div>
            <div style={{textAlign:"right"}}>Examples: </div>
            {this.props.examples}
        </React.Fragment>
    }
    onChange = (event) => {
        let split = event.target.name.split("|#|")
        let name = split[0]
        let index = parseInt(split[1])
        let values = this.props.values
        let value = event.target.value

        values[index] = value
        this.props.onChange(name, values)
    }
}
