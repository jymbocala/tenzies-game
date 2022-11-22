import React from "react";
import "./App.css";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // sets the state of dice to the array of 10 random numbers

  // a function to generate an array of 10 random numbers
  function allNewDice() {
    let diceNums = [];
    for (let i = 0; i < 10; i++) {
      diceNums.push(Math.ceil(Math.random() * 6));
    }
    return diceNums;
  };


  // map over the dice state numbers array to generate 10 Die elements with the value of each number.
  const diceElements = dice.map((die) => {
    return <Die value={die} />;
  });

  // a function to generate a new array of 10 random numbers and set the dice state to the new array
  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-btn" onClick={rollDice}>
          Roll
        </button>
      </main>
    </div>
  );
}
