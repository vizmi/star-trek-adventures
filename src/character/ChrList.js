import React from 'react'
import { Link } from 'react-router-dom'

import options from './options'
import chrs from './testChars'
import Character from './Character'

export default class ChrList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { characters: chrs }
    }

    deleteCharacter = (id) => {
        //TODO: confirmation
        let newChrs = this.state.characters.filter( c => c.id !== id )
        //console.log("remaining characters:" + newChrs.reduce((s, c) => s += c.name + ',', ''))
        this.setState({ characters: newChrs})
        //TODO: server side character deletion
    }

    render = () => {
        let cards = this.state.characters.map((c) => {
            return <ChrListItem key={c.id} character={c} action={this.deleteCharacter} />
        })

        return (
            <div className="flex-container">
                <ChrListItem key={-1} character={new Character(-1)} />
                {cards}
            </div>
        )
    }
}

class ChrListItem extends React.Component {
    render = () => {
        let c = this.props.character
        let name = c.name || <br/>
        let era = c.era >= 0 ? options.eras[c.era].name : <br/>
        let species = c.species >= 0 ? options.species[c.species].name : <br/>
        
        let links = <br/>
        if (c.id >= 0) {
            links = (<ul>
                <li style={{ width: "33%" }}>
                    <Link to={"/character/view/" + c.id}> View </Link>
                </li>
                <li style={{ width: "33%" }}>
                    <Link to={"/character/edit/" + c.id}> Edit </Link>
                </li>
                <li style={{ width: "33%" }}>
                    <a onClick={this.onClickDelete.bind(this, c.id)}
                        href={"/character/delete/" + c.id}> Delete </a>
                </li>
            </ul>)
        } else {
            links = (<ul>
                <li style={{ width: "100%" }}>
                    <Link to={"/character/edit/-1"}> Create new character </Link>
                </li>
            </ul>)
        }
        return (
            <div className="border">
                <div className="list-grid" style={{ width: "16em" }} >
                    <div className="card-label">Name: </div>
                    <div className="card-text">{name}</div>
                    <div className="card-label">Era of Play: </div>
                    <div className="card-text">{era}</div>
                    <div className="card-label">Species: </div>
                    <div className="card-text">{species}</div>
                </div>
                <div className="card-menu">
                    {links}
                </div>
            </div>
        )
    }
    onClickDelete = (id, e) => {
        e.preventDefault()
        console.log("id to be actioned: " + id)
        this.props.action(id)
    }
}