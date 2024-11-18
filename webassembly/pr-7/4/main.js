let snakeModule;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const width = canvas.width / tileSize;
const height = canvas.height / tileSize;

Module().then((module) => {
  snakeModule = module;
  snakeModule._initialize_game();
  document.addEventListener("keydown", changeDirection);
  setInterval(gameLoop, 100);
});

function changeDirection(event) {
  const directions = { 37: 3, 38: 0, 39: 1, 40: 2 };
  if (event.keyCode in directions) {
    snakeModule._change_direction(directions[event.keyCode]);
  }
}

function gameLoop() {
  if (snakeModule._is_game_over()) {
    alert("Игра окончена!");
    snakeModule._initialize_game();
  } else {
    snakeModule._update_snake();
    drawGame();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем еду
  const foodX = snakeModule._get_food_x() * tileSize;
  const foodY = snakeModule._get_food_y() * tileSize;
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, tileSize, tileSize);

  // Рисуем змейку
  const snakeLength = snakeModule._get_snake_length();
  const positionsPtr = snakeModule._get_snake_positions();
  const snakePositions = new Int32Array(
    snakeModule.HEAP32.buffer,
    positionsPtr,
    snakeLength * 2
  );
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeLength; i++) {
    const x = snakePositions[i * 2] * tileSize;
    const y = snakePositions[i * 2 + 1] * tileSize;
    ctx.fillRect(x, y, tileSize, tileSize);
  }
}
