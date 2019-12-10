import React, { Component } from 'react';
import './App.css';
import './Components/Favourites/favourites.css';
import './Components/ImageWall/imagewall.css';
import axios from 'axios';
import { observer, inject } from 'mobx-react'
import Search from './Components/Search/search'
import Favourites from './Components/Favourites/favourites';
import ImageWall from './Components/ImageWall/imagewall';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@inject("favestore")
@observer
class App extends Component {
  constructor() {
    super()
    this.state = {
      images: [],
      searchInpt: "",
      largeImageURL: "",
    }
  }

  updateInput = (event) => {
    this.setState({
      searchInpt: event.target.value
    })
  }

  searchInput = async () => {
    const API_KEY = '14510131-8d8c62756d592ead9005cbbb7'
    const searchVal = this.state.searchInpt.replace(' ', '+')
    let images = []
    let randoms = {}
    let datas = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchVal}&image_type=photo`)
    let hits = datas.data.hits


    let i = 0
    if (hits.length >= 6) {
      while (i < 6) {
        let rnd = getRandomInt(0, 19)
        if (!randoms[rnd]) {
          images.push(hits[rnd].largeImageURL)
          randoms[rnd] = 1
          i++
        }
      }
    }
    else if (hits.length == 0) {
      alert('No Results Found :(')
    }
    else {
      for (let url of hits) {
        images.push(url.largeImageURL)
      }
    }
    await this.setState({ images: images })
  }


  render() {
    return (
      <>
        <div className="App">

          <div className="searchbar">
            <input className='searchBar' placeholder='Search for Images' onChange={this.updateInput}></input>
            <button className='searchButton' onClick={this.searchInput}>Search</button>
          </div>

          <div className='picBoxes'>
            <ImageWall images={this.state.images} />
            <Favourites />
          </div>
        </div>
      </>
    );
  }
}
export default App;
