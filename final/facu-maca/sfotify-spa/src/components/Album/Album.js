import React, { Component } from 'react';
import axios from 'axios';


class Album extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      songs: [],
     
    }
  }

  showSongs(idAlbum){
    let obj = this;
    let url = 'https://api.spotify.com/v1/albums/' + idAlbum;
    let arrSongs = [];
    axios.get(url)
          .then(function(response){
            for (var i in response.data.tracks.items) {
              arrSongs.push(response.data.tracks.items[i]);
          }   
          obj.setState({songs:arrSongs});
          })
          .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    let obj = this;
    return (
    <div>
        <p> {this.props.albumName} </p>
        <img src={this.props.logo} className="FavoriteSongBox-albumImage" alt={this.props.albumName} onClick={() => {{obj.showSongs(this.props.albumId)}}}/>
        <ul>
          {this.state.songs.map(function(listValue, i){
            return <li key={i}> <a href={listValue.preview_url}> {listValue.name} </a> </li>;
          })}
        </ul>
        
    </div>    
    );
  }
}

export default Album;
