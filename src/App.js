import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // sets the state of dice to the array of 10 random numbers

  // generate a new die object
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  } 

  // a function to generate an array of objects with 10 random numbers and isHeld set to false by default
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // a function to flip isHeld value between true and false
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  // map over the dice state numbers array to generate 10 Die elements with the value of each number.
  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      value={die.value}
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ));

  // a function to generate new dice objects where die.isHeld is set to false
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die :
        generateNewDie()
    }));
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-btn" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}
