import React, { Component } from 'react';

class Produit extends Component {
    constructor(props) {
        super(props);
        this.state = { quantite: this.props.produit.quantite };
    }
    handleButtonClick(operateur) {
        let quantite = this.props.produit.quantite;
        switch (operateur) {
            case "+":
                quantite++;
                break;
            case "-":
                if (quantite === 0) return;
                quantite--;
                break;
        }
        this.props.produitChange(this.props.produit.id, quantite);
        // this.setState({ quantite: quantite });// la maj du state provoque l'appel de la méthode render
    }
    render() {
        return (
            <>
                <h3>{this.props.produit.nom} {this.props.produit.prix} €</h3>
                <p>x {this.props.produit.quantite}</p>
                <button onClick={() => this.handleButtonClick("-")}>-</button>
                <button onClick={() => this.handleButtonClick("+")}>+</button>
            </>
        );
    }
}

export default Produit;
