import React from 'react'
import { Link } from 'react-router-dom'

import './ChrList.css'

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
        var newChrs = this.state.characters.filter( c => c.id !== id )
        console.log("remaining characters:" + newChrs.reduce((s, c) => s += c.name + ',', ''))
        this.setState({ characters: newChrs})
        //TODO: server side character deletion
    }

    render = () => {
        var cards = this.state.characters.map((c) => {
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
        var c = this.props.character
        var name = c.name || <br/>
        var era = c.era >= 0 ? options.eras[c.era].name : <br/>
        var species = c.species >= 0 ? options.species[c.species].name : <br/>
        
        var links = <br/>
        if (c.id >= 0) {
            links = (<ul>
                <li><Link to={"/character/view/" + c.id}> View </Link></li>
                <li><Link to={"/character/edit/" + c.id}> Edit </Link></li>
                <li>
                    <a onClick={this.onDeleteClick.bind(this, c.id)}
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
            <div className="card">
                <div className="card-content" >
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
    onDeleteClick = (id, e) => {
        e.preventDefault()
        console.log("id to be actioned: " + id)
        this.props.action(id)
    }
}