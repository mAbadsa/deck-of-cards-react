import React from "react";
import axios from "axios";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({ deck: deck.data });
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
        alert(error)
    }
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
        {/* <img src={this.state.drawn[0].image} alt="card"/> */}
      </div>
    );
  }
}

export default Deck;
