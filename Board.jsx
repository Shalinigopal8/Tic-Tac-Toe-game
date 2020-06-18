import React, { useState } from "react";
import Square from "./Square";

function Board(props) {
  let gameOver = false; //variable to check if a player has won the game
  const [entries, setEntries] = useState([]); //maintains the ids of the filled squares
  const [xIsNext, setX] = useState(true); //to check which player is next
  const [values, setValues] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]); //maintains the data of all squares

  //onClick event of all the squares in the board
  function handleClick(event) {
    const id = event.target.id; //renders the button that got clicked
    //if the game is not over and the square is not yet filled then fill it with either X or O
    if (gameOver === false && values[id] === null) {
      //add the id of the square to be filled to the entries array
      setEntries(prevEntries => {
        const newEntries = [...prevEntries, id];
        return newEntries;
      });
      //fill the square with either X or O
      setValues(prevValues => {
        prevValues[id] = xIsNext ? "X" : "O";
        let newValues = [...prevValues];
        return newValues;
      });
      setX(!xIsNext);
    }
  }
  //onclick event for the undo button
  function handleUndoClick() {
    //renders the id of the item to be deleted from entries array
    const deleteItemId = entries.filter((item, index) => {
      return index === entries.length - 1; //returns the latest item added to the entries array
    });
    //deletes the latest value entered in the board
    setValues(prevValues => {
      prevValues[deleteItemId] = null;
      setX(!xIsNext);
      //removes the id of the deleted item from the entries array
      setEntries(prevEntries => {
        return entries.filter((item, index) => {
          return item !== deleteItemId[0];
        });
      });

      const updatedValues = [...prevValues];
      return updatedValues;
    });
  }
  //calculates the winner
  function calculateWinner() {
    const lines = [
      [0, 1, 2], //First horizontal line of squares in the board
      [3, 4, 5], //second horizontal line of squares in the board
      [6, 7, 8], //third horizontal line of squares in the board
      [0, 3, 6], //First vertical line of squares in the board
      [1, 4, 7], //second vertical line of squares in the board
      [2, 5, 8], //third vertical line of squares in the board
      [0, 4, 8], //diagonal line
      [2, 4, 6] //diagonal line
    ];
    for (var i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      //to check if all the 3 square values are same in a line
      if (values[a] === values[b] && values[a] === values[c]) {
        //to check if values[a] is not null or undefined i.e., there should be a value present
        if (values[a]) return values[a];
      }
    }
  }
  const winner = calculateWinner(); //gets the winner
  let status = "";
  //if winner contains a value other than null or undefined
  if (winner) {
    document.getElementById("status").classList.add("winner");
    status = "Winner is: " + winner;
    gameOver = true;
  } else status = "Next Player is: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <h5 id="status">{status}</h5>
      <div className="container">
        <div className="row">
          <Square id="0" value={values[0]} onClick={handleClick} />
          <Square id="1" value={values[1]} onClick={handleClick} />
          <Square id="2" value={values[2]} onClick={handleClick} />
        </div>
        <div className="row">
          <Square id="3" value={values[3]} onClick={handleClick} />
          <Square id="4" value={values[4]} onClick={handleClick} />
          <Square id="5" value={values[5]} onClick={handleClick} />
        </div>
        <div className="row">
          <Square id="6" value={values[6]} onClick={handleClick} />
          <Square id="7" value={values[7]} onClick={handleClick} />
          <Square id="8" value={values[8]} onClick={handleClick} />
        </div>
      </div>
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={handleUndoClick}
      >
        Undo
      </button>
    </div>
  );
}

export default Board;
