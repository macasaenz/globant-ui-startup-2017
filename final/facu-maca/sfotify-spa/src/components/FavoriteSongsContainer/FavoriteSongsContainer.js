import React, { Component } from 'react';

class FavoriteSongsContainer extends Component {
  
  myFunc(){
    console.log("click artista");
  }
  render() {
   
    return (
      <div>
        <ul>
          {this.props.names.map(function(listValue,i){
            return <li key={i} > {listValue} </li>;
          })}
        </ul>  
      </div>
    );
  }
}

export default FavoriteSongsContainer;
