import React, { Component } from 'react';
import styles from './InputSearch.css';
import axios from 'axios';
import Artist from '../Artist/Artist'


class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    }
  }

  handleClickSearch() {
    let q = document.getElementById("inputSearch").value;
    let url = 'https://api.spotify.com/v1/search?q=' + q + '&type=artist';
    let arr = [];
    let obj = this;
    obj.setState({ names: []});
    axios.get(url)
      .then(function (response) {
        for (var i in response.data.artists.items) {
          if (response.data.artists.items[i].images.length == 0) {
            response.data.artists.items[i].images = [{
              "height": 1000,
              "url": "https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/128x128/no.png",
              "width": 1000
            }, {
              "height": 640,
              "url": "https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/128x128/no.png",
              "width": 640
            }, {
              "height": 200,
              "url": "https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/128x128/no.png",
              "width": 200
            }, {
              "height": 64,
              "url": "https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/128x128/no.png",
              "width": 64
            }];
          }
          arr.push(response.data.artists.items);

        }
        obj.setState({ names: arr });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    var self = this;

    return (
      <div class="form-group">
        <input type="text" id="inputSearch" class="form-control" placeholder="Search the name of your favorite artist">
        </input>
        <input type="submit" id="search" class="form-control" className="btn" value="search" onClick={this.handleClickSearch.bind(this)}></input>
        <div class="container">
          <ul class="list-group">
            {
              this.state.names.map(function (listValue, i) {
                return <li class="list-group-item" key={i}> < Artist artistName={listValue[i].name} logo={listValue[i].images[1].url} artistId={listValue[i].id} /> </li>;
              })}
          </ul>
        </div>
        {/*<ul>
          {this.state.albums.map(function(listValue, i){
            return <li key={i} > <Album albumName={listValue[i].name} logo={listValue[i].images[2].url} albumId={listValue[i].id} /> </li>;
          })}
        </ul>*/}



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
