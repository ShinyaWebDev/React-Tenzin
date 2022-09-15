import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzin, setTenzin] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzin(true)
        }
    }, [dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
        }
        
        return newDice
    }

    function rollDice() {

        if(!tenzin) {
            setDice(oldDice => oldDice.map(dice => {
                return dice.isHeld ?
                dice:
                {
                    value: Math.ceil(Math.random() * 6), 
                    isHeld: false,
                    id: nanoid()
                }
            }))
        } else {
            setTenzin(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? 
                {...dice, isHeld: !dice.isHeld} :
                dice
        }))
    }

    const diceElements = dice.map(dice => (
    <Dice key={dice.id} 
          value={dice.value} 
          isHeld={dice.isHeld}
          holdDice={() => holdDice(dice.id)} 
          />
    ))
    
    return (
        <main>
            {tenzin && <Confetti />}
            <h1 className="title">Tenzin</h1>
           
            <div className="dice-container">
               {diceElements}
            </div>
            <button className="roll-dice" 
                    onClick={rollDice}
            >{tenzin ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
