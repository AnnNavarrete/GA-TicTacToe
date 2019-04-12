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

var startSound = function() {
  var audio = new Audio("Oooo_yeah__caaan_doo!.wav");
  audio.play();
};

var clickSound = function() {
  var audio = new Audio("click.mp3");
  audio.play();
};

// update current player winning combo:
var winningCombo = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12]
];

var checkIsWinner = function() {
  for (var i = 0; i < winningCombo.length; i++) {
    var isWinner = true; // assuming it's always a win to begin with, unless proven otherwise

    for (var j = 0; j < winningCombo[i].length; j++) {
      // itirates through winning move positions
      var winningMoveIndex = winningCombo[i][j];
      if (currentPlayer() !== state.gameboard[winningMoveIndex]) {
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

// store in an object to make local storage simpler
var state = {
  countTurn: 0,
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  score: {
    // moved to better keep track of players score
    X: 0,
    O: 0
  },
  resetCount: 0
};

var stateStorage = window.localStorage.getItem("state");
if (stateStorage !== null) {
  state = JSON.parse(stateStorage);
}

var currentPlayer = function() {
  // assigning player one to even and second player to odd
  if (state.countTurn % 2 === 0) {
    return "X";
  } else {
    return "O";
  }
};

var clicked = function(i) {
  clickSound();
  // the parameter is the element id which is the position in the gameboard array
  var i = parseInt(i);
  state.gameboard[i] = currentPlayer(); // update current players move in the game board

  if (checkIsWinner()) {
    state.score[currentPlayer()]++;
  } else {
    state.countTurn++; // update the number of times the players have had a turn
  }
  if (state.gameboard.indexOf(0) === -1) {
    // check if gameboard array != to 0 a to reset the game
    alert("It's a draw!");
  }

  updateGameboard();
};

var updateGameboard = function() {
  for (var i = 0; i < state.gameboard.length; i++) {
    var tile = document.getElementById(i);

    if (state.gameboard[i] === 0) {
      tile.innerText = "";
    } else {
      tile.innerText = state.gameboard[i];
    }
    document.getElementById("pX").innerText = state.score.X;
    document.getElementById("pO").innerText = state.score.O;
    // store state object in local storage to persist game between sessions
    window.localStorage.setItem("state", JSON.stringify(state));
  }
};

updateGameboard();

var resetGame = function() {
  state.resetCount++;
  if (state.resetCount >= 3) {
    alert("Game Over");
    window.localStorage.removeItem("state");
    window.location = "https://www.youtube.com/embed/UFFi9PWKDjg"; // test video
  }
  startSound();
  state.countTurn = 0;
  state.gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  updateGameboard();
};
