import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // sets the state of dice to the array of 10 random numbers

  const [tenzies, setTenzies] = React.useState(false); // sets the winning state (called "tenzies") to false

  // an effect that checks if all dice are held and if all dice have the same value every time the dice state changes.
  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstDieValue = dice[0].value;
    const allDiceHasSameValue = dice.every(
      (die) => die.value === firstDieValue
    );

    // set winning state to true if all dice are held and if all dice have the same value
    if (allDiceHeld && allDiceHasSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // generate a new die object
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // generates an array of objects with 10 random numbers and isHeld set to false by default
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // flips isHeld value between true and false
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
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

  // generates new dice objects where die.isHeld is set to false and game has not won. If game is won, restarts the game by setting states.
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <div className="main--top">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
