import React, { Component } from 'react';
import styles from './InputSearch.css';

class InputSearch extends Component {
  render() {
    return (
      <div>
        <input type="text" id="inputSearch" placeholder="Search the name of your favorite artist">
        </input>
      </div>
    )
  }
}

export default InputSearch;
