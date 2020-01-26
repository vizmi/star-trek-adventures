import React from 'react';

export default class Value extends React.Component {
    render = () => {
        if (this.props.hidden) return null
        return <React.Fragment>
            <div className="card-label">Value: </div>
            <input type="text" name={this.props.fieldName} value={this.props.value} onChange={this.onChange}/>
            <div style={{textAlign:"right"}}>Examples: </div>
            {this.props.examples}
        </React.Fragment>
    }
    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}
