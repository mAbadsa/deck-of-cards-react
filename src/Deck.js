import React from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [], isLoaded: false };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    if (!deck) {
      this.setState(st => ({ isLoaded: !st.isLoaded }));
    } else {
      this.setState({ deck: deck.data });
    }
  }

  async getCard() {
    const id = this.state.deck.deck_id;
    try {
      const cardUrl = `${API_BASE_URL}/${id}/draw/`;
      const cardRes = await axios(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No Card Remaining...");
      }
      const card = cardRes.data.cards[0];
      this.setState(st => {
        return {
          drawn: [
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} of ${card.suit}`
            }
          ]
        };
      });
      console.log(cardRes.data);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const cards = this.state.drawn.map(card => {
      return <Card key={card.id} image={card.image} name={card.name} />;
    });
    return (
      <div>
        <h1>Card Dealer</h1>
        {!this.state.isLoaded ? (
          <div className="Deck">
            <button onClick={this.getCard}>Get Card!</button>
            <div className="Deck-cardarea">{cards}</div>
          </div>
        ) : (
          <div className="Deck">
            <p>Loading...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Deck;
