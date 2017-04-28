import React, { Component } from 'react';
import axios from 'axios';


class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: [],

    }
  }

  showSongs(idAlbum) {
    let obj = this;
    let url = 'https://api.spotify.com/v1/albums/' + idAlbum;
    let arrSongs = [];
    axios.get(url)
      .then(function (response) {
        for (var i in response.data.tracks.items) {
          arrSongs.push(response.data.tracks.items[i]);
        }
        obj.setState({ songs: arrSongs });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  orderaArray() {
    this.state.songs.sort(function (a, b) {
      return parseFloat(a.duration_ms) - parseFloat(b.duration_ms);
    });
    console.log(this.state.songs);
    this.render();
    alert("The songs are sorted by duration");
  }

  render() {
    let obj = this;
    return (
      <div>
        <div>
          <h5> {this.props.albumName} </h5>
          <img id="art" src={this.props.logo} alt={this.props.albumName} onClick={() => { { obj.showSongs(this.props.albumId) } }} />
        </div>
        <ul >
          {this.state.songs.map(function (listValue, i) {
            return <li key={i}> <a href={listValue.preview_url}> {listValue.name} </a> </li>;
          })}
        </ul>
        <button type="button" class="btn btn-primary" onClick={() => { { obj.orderaArray() } }}>Ordenar por duracion</button>

      </div>
    );
  }
}

export default Album;
