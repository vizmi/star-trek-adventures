import React from 'react';

export default class UpbringingAccepted extends React.Component {
    render = () => {
        if (this.props.hidden) return null

        return (<React.Fragment>
            <div className="card-label">Is accepted? </div>
            <div>
                <label>
                    <input type="radio" name={this.props.fieldName} value="true"
                        checked={this.props.value === "true"}
                        onChange={this.onChange} />
                    Accepted
                </label>
                <label>
                    <input type="radio" name={this.props.fieldName} value="false"
                        checked={this.props.value === "false"}
                        onChange={this.onChange} />
                    Rejected
                </label>
            </div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, event.target.value)
    }
}
