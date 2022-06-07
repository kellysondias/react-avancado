import {useState} from 'react'
import {useEffect} from 'react'

async function createDeck() {
    const url = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await url.json()
    return deck.deck_id 
}

async function getCards(deckId) {
    const url = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
    return await url.json()
}

const DeckOfCards = () => {

    const [deck, setDeck] = useState({
        cardList: []
    })

    useEffect(() => {
        const fetchData = async () => {

            const deckId = await createDeck()
            const cardsData = await getCards(deckId)

            setDeck({
                cardList: cardsData.cards
            })
    }

    fetchData()
    }, [])

    return (
        <section>
                <ul>
                    {
                        deck.cardList.map((card, index) => {
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

    /* constructor() {
        super()
        this.state = {
            cardList: []
        }
    }

    async componentDidMount() {
        const deckId = await createDeck()
        const cardsData = await getCards(deckId)

        this.setState({
            cardList: cardsData.cards
        })
    }

    render() {
        return (
            <section>
                <ul>
                    {
                        this.state.cardList.map((card, index) => {
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
    } */
}

export default DeckOfCards