import React, { Component } from 'react';
import styles from './InputSearch.css';
import apiCalls from '../../../apiCalls'

class InputSearch extends Component {
  render() {
    return (
      <div>
        <input type="text" id="inputSearch" placeholder="Search the name of your favorite artist">
        </input>
        <input type="submit" id="search" className="btn" value="search"></input>
      </div>
    )
  }
}
window.addEventListener("load", function () {
 document.getElementById("search").addEventListener("click",function (){
   let q = document.getElementById("inputSearch").value;
   let api = new apiCalls();
   api.genSearch("artist",q)
 })
})
export default InputSearch;
