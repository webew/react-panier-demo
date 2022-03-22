import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Catalogue from './pages/Catalogue';
import Panier from './pages/Panier';
import Header from './components/header/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { produits: [] }
  }
  async componentDidMount() {
    // Ici on initialise les données du composant
    const response = await fetch("datas/datas.json");
    const datas = await response.json();
    this.setState({ produits: datas });
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/catalogue' element={<Catalogue produits={this.state.produits} />} />
          <Route path='/panier' element={<Panier />} />
          <Route path='/' element={<Accueil />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
