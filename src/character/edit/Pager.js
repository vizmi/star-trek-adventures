import React from 'react'

export default class Pager extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tab: 0 }
    }

    navigationStatus = (direction) => {
        //console.log(direction, this.state.tab)
        if ((direction === -1 && this.state.tab === 0) ||
                (direction === 1 && this.state.tab === this.props.children.length - 1)) {
            return "disabled"
        } else {
            return ""
        }
    }

    navigateTo = (newTab, e) => {
        e.preventDefault()
        newTab = Math.max(newTab, 0)
        newTab = Math.min(newTab, this.props.children.length - 1)
        this.setState( { tab: newTab } )
    }

    render = () => {
        return (
            <div className="border">
                <div>
                    {this.props.children[this.state.tab]}
                </div>
                <div className="card-menu">
                    <ul>
                        <li style={{ width: "25%" }}>
                            <a href="/previous"
                                className={this.navigationStatus(-1)}
                                onClick={this.navigateTo.bind(this, this.state.tab - 1)}> Prev </a>
                        </li>
                        <li style={{ width: "25%" }}>
                            <a href="/next"
                            className={this.navigationStatus(1)} 
                            onClick={this.navigateTo.bind(this, this.state.tab + 1)}> Next </a>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}
