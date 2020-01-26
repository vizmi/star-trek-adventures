import React from 'react';

export default class Era extends React.Component {
    render = () => {
        let eras = this.props.eras.map((era, i) =>
            (<label key={i}>
                <input type="radio" name="era" value={i}
                    checked={this.props.value === i}
                    onChange={this.onChange} />
                {era.name}
            </label>)
        )

        return (<React.Fragment>
            <div className="card-label">Era of Play: </div>
            <div>{eras}</div>
        </React.Fragment>)
    }

    onChange = (event) => {
        this.props.onChange(event.target.name, parseInt(event.target.value))
    }
}
