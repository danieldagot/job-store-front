import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'


class Search extends Component {
    constructor() {
        super()
        this.state = {
            search: "",
        }
    }
    updateInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return (
            <div className="searchbar">
                <input className='searchBar' placeholder='Search for Images'></input>
                <button className='searchButton'>Search</button>
            </div>
        )
    }
}

export default Search