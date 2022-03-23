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
    const response = await fetch("https://localhost:8000/main");
    // const response = await fetch("datas/datas.json");
    const datas = await response.json();
    datas.map(prod => prod.quantite = 0);
    console.log(datas);
    this.setState({ produits: datas });
  }
  produitChange(id, quantite) {
    // on va mettre à jour le catalogue
    const produits = this.state.produits;
    produits.map((produit) => { // on recherche dans le catalogue le produit en cours de modification
      if (produit.id === id) {
        produit.quantite = quantite;
      }
      return produit;
    });
    this.setState({ produits: produits }); // on met à jour le state pour refresh l'affichage de tous les composants
  }
  render() {
    // on filtre dans le catalogue les produits dont la quantité est différente de 0 => produits du panier
    const produitsPanier = this.state.produits.filter((produit) => { return produit.quantite !== 0 });
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/catalogue' element={<Catalogue produits={this.state.produits} produitChange={(id, quantite) => this.produitChange(id, quantite)} />} />
          <Route path='/panier' element={<Panier produitsPanier={produitsPanier} />} />
          <Route path='/' element={<Accueil />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
