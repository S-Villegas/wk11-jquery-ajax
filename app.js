// Constants: (cells, statusText, newgameBtn, and winConditions)
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const newgameBtn = document.querySelector("#newgameBtn");

// what needs to be done to become a winner  
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// player X begins game- with empty clicks ("")
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();
// Function-game starts when a click is made inside grid  
// Function-game restarts when a click is made on the button
function startGame(){
    cells.forEach(cell => cell.addEventListener("click", boxClicked));
    newgameBtn.addEventListener("click", restartGame);
// established a template literal when identifying which player's turn it is.
    statusText.textContent = `${currentPlayer} is next`;
    running = true;
}
//Function-shows what happens when a box is clicked.
function boxClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return; 
    }
 updateCell(this, cellIndex);
    checkWinner();
}
// Function -calls the player "X" or "O" 
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// Function- calls the player "X" or "O" that is next to play
function switchPlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} is next`;
}
// Function - checks for a winner, winner has 3 cells completed: in column, row or diagonal. 
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    //Winner or Tie announcement 
    if(roundWon){
        statusText.textContent = `${currentPlayer} is the winner!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `It's a tie!`;
        running = false;
    }
    else{
        switchPlayer();
    }

}
//Function- to start a new game at a any time - new games begin with player "X"
function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell =>cell.textContent = "");
    running = true;
}