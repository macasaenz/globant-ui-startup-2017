import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Title from '../../components/Title/Title';
import Subtitle from '../../components/Subtitle/Subtitle';
import Header from '../../components/Header/Header';
import InputSearch from '../../components/InputSearch/InputSearch';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Title texts="Sfotify" styleName="text-color-white" />
        <InputSearch />
        <Subtitle />
        <Footer text="Footer" />
      </div>
    );
  }
}

export default Home;
