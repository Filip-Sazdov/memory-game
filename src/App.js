import { useEffect, useState } from 'react'
import './App.css';

import SingleCard from './components/SingleCard'

const cardImages = [ //created outside of component since they never need to change and to avoid array recreation every time the component is re-evaluated
  { 'src': '/img/helmet-1.png' },
  { 'src': '/img/potion-1.png' },
  { 'src': '/img/ring-1.png' },
  { 'src': '/img/scroll-1.png' },
  { 'src': '/img/shield-1.png' },
  { 'src': '/img/sword-1.png' }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)



  //shuffle cards and apply random id to each card
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //sort in JS is the stupidest sort in all coding languages, compares UTF-16 code units values for strings so 80 is less than 8, has to be used with compare function which returns <0(sort ascending), >0(sort descending), ===0(keep original order). We are using it as random sort in this case.
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('Your choices match, great job!')
        resetChoices()
      } else {
        console.log('Your choices do not match, please try again.')
        resetChoices()
      }
    }
    console.log(turns, choiceOne, choiceTwo)
  }, [choiceOne, choiceTwo, turns])

  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns => turns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
