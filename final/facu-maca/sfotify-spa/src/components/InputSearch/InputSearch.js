import React, { Component } from 'react';
import styles from './InputSearch.css';
import axios from 'axios';
import Album from '../Album/Album'


class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      albums: [],
    }
  }

  handleClickSearch(){
    let q = document.getElementById("inputSearch").value;
    let url = 'https://api.spotify.com/v1/search?q=' + q + '&type=artist';
    let arr = [];
    let obj = this;
    axios.get(url)
        .then(function (response) {
          for (var i in response.data.artists.items) {
              arr.push(response.data.artists.items);
          }       
          obj.setState({names:arr});   
        })
        .catch(function (error) {
          console.log(error);
        });    
  }

  showAlbum(i) { 
    let obj2 = this;
    let arr = [];
    let idArtist = i.id;
    let url= "https://api.spotify.com/v1/artists/" + idArtist + "/albums";
    axios.get(url)
         .then(function (response) {         
          for (var i in response.data.items) {
              arr.push(response.data.items);
          }       
          obj2.setState({albums:arr});  
        })
         .catch(function (error) {
          console.log(error);
        });

   }                          

  render() {
    var self = this;
    return (
      <div>
        <input type="text" id="inputSearch" placeholder="Search the name of your favorite artist">
        </input>
        <input type="submit" id="search" className="btn" value="search" onClick={this.handleClickSearch.bind(this)}></input>

        <div id="ArtistsContainer">
        <ul>
          {this.state.names.map(function(listValue,i){
            return <li key={i} onClick={() => {{self.showAlbum(listValue[i])}}} > {listValue[i].name} </li>;           
          })}
        </ul>  
        </div>

        <ul>
          {this.state.albums.map(function(listValue, i){
            return <li key={i} > <Album albumName={listValue[i].name} logo={listValue[i].images[2].url} albumId={listValue[i].id} /> </li>;
          })}
        </ul>

       

        {/*<div id="AlbumsContainer">
        <ul>
          {this.state.albums.map(function(listValue,i){
            return <li key={i} > {listValue[i]} </li>;           
          })}
        </ul>  
        </div>*/}




      </div>
    )
  }
}

//document.getElementById("1").addEventListener("click", getSearch)
/*
window.addEventListener("load", function () {
  document.getElementById("search").addEventListener("click", getSearch)
  })

let getSearch = function getSearch(){
  let q = document.getElementById("inputSearch").value;
  let url = 'https://api.spotify.com/v1/search?q=' + q + '&type=artist';
   axios.get(url)
        .then(function (response) {
          myFunc(response);
        })
        .catch(function (error) {
          console.log(error);
        });
 }

 let myFunc = function myFunc(data){
  let names = data.data.artists.items;
  let ul = document.createElement("ul");
  for (let i = 0; i < names.length; i++) {
    let li = document.createElement("li");
    let text = document.createTextNode(names[i].name);
    li.appendChild(text);
    ul.appendChild(li);
  }
  document.getElementById("listContainer").appendChild(ul);
}

*/
  





export default InputSearch;
