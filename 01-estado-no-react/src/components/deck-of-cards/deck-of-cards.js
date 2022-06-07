import {Component} from 'react'

async function createDeck() {
    const url = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await url.json()
    return deck.deck_id 
}

async function getCards(deckId) {
    const url = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
    return await url.json()
}

class DeckOfCards extends Component {
    constructor() {
        super()
        this.state = {
            cards: []
        }
    }

    async componentDidMount() {
        const deckId = await createDeck()
        const cardsData = await getCards(deckId)

        this.setState({
            cards: cardsData.cards
        })
    }

    render() {
        return (
            <section>
                <ul>
                    {
                        this.state.cards.map((card, index) => {
                            return (
                                <li key={index}>
                                    <img src={card.image}alt= {card.value}></img>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}

export default DeckOfCards