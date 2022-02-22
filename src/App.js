import { useEffect, useState } from 'react'
import './App.css'
import Comp from './Comp/Comp'

const cardImages = [
  { "src": "/img/black-panther.jpg" ,matched:false},
  { "src": "/img/m416.jpg" ,matched:false},
  { "src": "/img/iron.jpg",matched:false },
  { "src": "/img/spider.jpg",matched:false },
  { "src": "/img/captain-marvel.jpg",matched:false },
  { "src": "/img/thor.jpg",matched:false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstchoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
          
    setCards(shuffledCards)
    setFirstChoice(null)
    setSecondChoice(null)

    setTurns(0)
  }

  const handlechoice = (card) => {
    
    firstchoice ? setSecondChoice(card) : setFirstChoice(card)
    
    
  }
  useEffect(() => {
 
    if (firstchoice && secondChoice) {
      

      setDisabled(true)
      if (firstchoice.src === secondChoice.src) {

        setCards ( prevCard => {
          return prevCard.map(card =>{
            if(card.src === firstchoice.src){

              return {...card , matched:true}

            }else{
              return card
            }
          })
        })
        resetTurn()
      } else {
        
        setTimeout(()=> resetTurn() , 1000)
      }

    }
  }, [firstchoice, secondChoice])

  // reset choices & increase turn
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Comp 
            key={card.id}
            card={card}
            handlechoice = {handlechoice}
            flipped = {card === firstchoice || card === secondChoice || card.matched}
            // finished = {card.matched != false}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App