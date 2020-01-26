import React from 'react';

export default class Name extends React.Component {
    render = () => (
        <React.Fragment>
            <div className="card-label">Name: </div>
            <input type="text" name="name" value={this.props.value} onChange={this.onChange}/>
        </React.Fragment>
    )
    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}
