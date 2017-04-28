import React, { Component } from 'react';
import './FavoriteSongBox.css';

class FavoriteSongBox extends Component {

  

  render() {
    return (

    <div>
      <ul>
          {this.props.albumName.map(function(listValue,i){
            return <li key={i} > {listValue} </li>;           
          })}
        </ul> 
      </div>
    );
  }
}

export default FavoriteSongBox;
