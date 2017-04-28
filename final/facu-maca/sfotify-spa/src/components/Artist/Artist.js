import React, { Component } from 'react';
import axios from 'axios';
import Album from '../Album/Album'
import InputSearch from '../InputSearch/InputSearch';

class Artist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    }
  }

  showAlbum(i) {
    let obj2 = this;
    let arr = [];
    let idArtist = i;
    let url = "https://api.spotify.com/v1/artists/" + idArtist + "/albums";
    axios.get(url)
      .then(function (response) {
        for (var i in response.data.items) {
          arr.push(response.data.items);
        }
        obj2.setState({ albums: arr });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    var self = this;
    return (
      <div>
      <div>
        <h4> {this.props.artistName} </h4>
        <img id="art" src={this.props.logo} alt={this.props.artistName} onClick={() => { { self.showAlbum(this.props.artistId) } }} />
        {/*{this.state.names.map(function(listValue,i){
            return <li key={i} > <Artist onClick={() => {{self.showAlbum(listValue[i])}}} name={listValue[i].name} logo={listValue[i].images[2].url} /> </li>;           
          })}
        </ul>  */}

      </div >
      <ul >
        {this.state.albums.map(function (listValue, i) {
          return <li key={i} > <Album albumName={listValue[i].name} logo={listValue[i].images[1].url} albumId={listValue[i].id} /> </li>;
        })}
      </ul>
        </div >
      )
  }
}


export default Artist;
