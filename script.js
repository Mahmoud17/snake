const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start")
const scoreElement = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let id = 0
let time = 800
let direction = 1
let apple = 0
let score = 0

function drawGrid() {
  for (let i = 0; i < 400; i += 1) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.append(square);
    squares.push(square);
  }
}

drawGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  clearInterval(id)
  currentSnake.forEach(index => squares[index].classList.remove("snake"))
  squares[apple].classList.remove("apple")
  currentSnake = [2, 1, 0]
  time = 1000
  direction = 1
  score = 0
  
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  scoreElement.textContent = score
  id = setInterval(move, time)
  generateApple()
}

function generateApple() {
  do {
    apple = Math.floor(Math.random() * 400)
  } while (squares[apple].classList.contains("snake"))

  squares[apple].classList.add("apple")
}

function move() {
  if ((currentSnake[0] + 20 >= 400 && direction == 20) ||
     (currentSnake[0] - 20 < 0  && direction == -20) ||
     (currentSnake[0] % 20 === 19 && direction == 1) ||
     (currentSnake[0] % 20 === 0 && direction == -1) || 
     (squares[currentSnake[0] + direction].classList.contains('snake')) ) {
       return clearInterval(id)
     }
  let tail = currentSnake.pop()
  squares[tail].classList.remove("snake")
  currentSnake.unshift(currentSnake[0] + direction)
  squares[currentSnake[0]].classList.add("snake")
  
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple")
    currentSnake.push(tail)
    squares[tail].classList.add("snake")
    generateApple()
    clearInterval(id)
    time *= .95
    id = setInterval(move, time)
    score += 1
    scoreElement.textContent = score
  }
  

}

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 39) {
    direction = 1
  } else if (e.keyCode === 38) {
      direction = -20
  } else if (e.keyCode === 37) {
      direction = -1
  } else if (e.keyCode === 40) {
      direction = 20
  }
})

startBtn.addEventListener("click", startGame)