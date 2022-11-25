import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {


  const [dice, setDice] = React.useState(allNewDice()); // sets the state of dice to the array of 10 random numbers

  // a function to generate an array of objects with 10 random numbers and isHeld set to false by default
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  // map over the dice state numbers array to generate 10 Die elements with the value of each number.
  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld}/>
  ));

  // a function to generate a new array of 10 random numbers and set the dice state to the new array
  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <div className="App">
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={rollDice}>
          Roll
        </button>
      </main>
    </div>
  );
}
