/* Project One 10th of April

// pseudocode
// This game is for two players, who takes alternating turns to write X or O on a 3x3 grid
// The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game

// FIRST STAGE

// 0 create a 3x3 grid
// 1 create two players and assign either an X or O character for each player
// 2 create how the two players can alternate turns
//     if player one click input X in the grid selected
//     switch to player two to place O in one of the grid
//     keep track of each players turn
//     (don't worry about itiration yet, focus on getting a player placing a character and switching to the other)
// 3 create how the player wins the game
//     There is 8 ways to win the game (3x vertical, 3x horizontal, 2x diagonal)
//     if one player place three of their marks in a horizontal, vertical or diagonal row, end game and player wins
//     if none of players manage to place three of their marks in a row, end game and restart
//     number of maximum move a player can make is 5x max
// 4 create a scoring system where it can be viewed in the browser
//     create win algorithm
//     start with both zero for each player
//     if one player wins, update the scoring system
//     end the game

// tools to consider
// loop
//     player move
//         do something
//     draw changes
//     check for wins

// WIN ALGORITHM
// IF one player selects one of the following combination
//     return player x wins

// first combo: box [1 2 3]
// second combo: box [4 5 6]
// third combo: box [7 8 9]
// fourth combo: box [1 4 7]
// fifth combo: box [2 5 8]
// sixth combo: box [3 6 9]
// seventh combo: box [1 5 9]
// eight combo: box [3 5 7]

// If all of 9 moves were executed by both players
// ELSE it's a draw

// Number of times player can 'click' on any boxes is 5x max each
// */

// WIN ALGORITHM

// player winning combo:
var winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var checkIsWinner = function() {
  for (var i = 0; i < winningCombo.length; i++) {
    var isWinner = true; // assuming it's always a win to begin with, unless proven otherwise

    for (var j = 0; j < winningCombo[i].length; j++) {
      // itirates through winning move positions
      var winningMoveIndex = winningCombo[i][j];
      if (currentPlayer() !== gameboard[winningMoveIndex]) {
        // checking that a player has not matched the position of a winning combo
        isWinner = false;
      }
    }
    if (isWinner) {
      // if player matches any winning position, return true = winning
      return true;
    }
  }
  return false;
};

var score = {
  // moved to better keep track of players score
  X: 0,
  O: 0
};

var countTurn = 0;
var gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var currentPlayer = function() {
  // assigning player one to even and second player to odd
  if (countTurn % 2 === 0) {
    return "X";
  } else {
    return "O";
  }
};

var clicked = function(i) {
  // the parameter is the element id which is the position in the gameboard array
  var i = parseInt(i);
  gameboard[i] = currentPlayer(); // update current players move in the game board

  if (checkIsWinner()) {
    alert(`${currentPlayer()} Won!`);
    score[currentPlayer()]++;
    // keep track of player scores, by looking up player name as object
    // if (currentPlayer() === "X") {
    //score.X++
    // } else {
    //score.O++
    // }
  } else {
    countTurn++; // update the number of times the players have had a turn
  }
  if (gameboard.indexOf(0) === -1) {
    // check if gameboard array != to 0 a to reset the game
    alert("It's a draw!");
    resetGame();
  }

  updateGameboard();
};

var updateGameboard = function() {
  for (var i = 0; i < gameboard.length; i++) {
    if (gameboard[i] === 0) {
      continue;
    }
    var tile = document.getElementById(i);
    tile.innerText = gameboard[i];
    document.getElementById("pX").innerText = score.X;
    document.getElementById("pO").innerText = score.O;
  }
};

updateGameboard();

var resetGame = function() {
  countTurn = 0;
  gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  document.querySelectorAll(".grid div").forEach(function(cell) {
    cell.innerText = "";
  });
};

updateGameboard();
