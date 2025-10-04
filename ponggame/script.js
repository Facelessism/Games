const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 16;
const PLAYER_X = 32;
const AI_X = canvas.width - 32 - PADDLE_WIDTH;
const PADDLE_SPEED = 7;
const AI_SPEED = 4;

// Game state
let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballVX = 5 * (Math.random() < 0.5 ? 1 : -1);
let ballVY = 4 * (Math.random() < 0.5 ? 1 : -1);

// Score (optional, add if you want)
let playerScore = 0;
let aiScore = 0;

// Mouse movement handler
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  playerY = mouseY - PADDLE_HEIGHT / 2;

  // Clamp within bounds
  if (playerY < 0) playerY = 0;
  if (playerY + PADDLE_HEIGHT > canvas.height) playerY = canvas.height - PADDLE_HEIGHT;
});

// Simple AI for right paddle
function updateAI() {
  const targetY = ballY + BALL_SIZE / 2 - PADDLE_HEIGHT / 2;
  if (aiY + PADDLE_HEIGHT / 2 < targetY) {
    aiY += AI_SPEED;
  } else if (aiY + PADDLE_HEIGHT / 2 > targetY) {
    aiY -= AI_SPEED;
  }
  // Clamp
  if (aiY < 0) aiY = 0;
  if (aiY + PADDLE_HEIGHT > canvas.height) aiY = canvas.height - PADDLE_HEIGHT;
}

// Ball movement and collision detection
function updateBall() {
  ballX += ballVX;
  ballY += ballVY;

  // Top/bottom wall collision
  if (ballY <= 0 || ballY + BALL_SIZE >= canvas.height) {
    ballVY = -ballVY;
    ballY = Math.max(0, Math.min(ballY, canvas.height - BALL_SIZE));
  }

  // Left paddle collision
  if (
    ballX <= PLAYER_X + PADDLE_WIDTH &&
    ballX >= PLAYER_X &&
    ballY + BALL_SIZE > playerY &&
    ballY < playerY + PADDLE_HEIGHT
  ) {
    ballVX = Math.abs(ballVX);
    // Add some control based on where it hits the paddle
    let hitPos = (ballY + BALL_SIZE / 2) - (playerY + PADDLE_HEIGHT / 2);
    ballVY += hitPos * 0.09;
  }

  // Right paddle collision
  if (
    ballX + BALL_SIZE >= AI_X &&
    ballX + BALL_SIZE <= AI_X + PADDLE_WIDTH &&
    ballY + BALL_SIZE > aiY &&
    ballY < aiY + PADDLE_HEIGHT
  ) {
    ballVX = -Math.abs(ballVX);
    let hitPos = (ballY + BALL_SIZE / 2) - (aiY + PADDLE_HEIGHT / 2);
    ballVY += hitPos * 0.09;
  }

  // Left/right wall (score)
  if (ballX < 0) {
    aiScore++;
    resetBall(-1);
  }
  if (ballX + BALL_SIZE > canvas.width) {
    playerScore++;
    resetBall(1);
  }
}

// Reset ball after score
function resetBall(direction) {
  ballX = canvas.width / 2 - BALL_SIZE / 2;
  ballY = canvas.height / 2 - BALL_SIZE / 2;
  ballVX = 5 * direction;
  ballVY = 4 * (Math.random() < 0.5 ? 1 : -1);
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Middle line
  ctx.strokeStyle = '#444';
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Left paddle
  ctx.fillStyle = '#0ff';
  ctx.fillRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Right paddle
  ctx.fillStyle = '#f0f';
  ctx.fillRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Ball
  ctx.fillStyle = '#fff';
  ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

  // Score
  ctx.font = '32px Segoe UI, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(playerScore, canvas.width / 2 - 60, 40);
  ctx.fillText(aiScore, canvas.width / 2 + 60, 40);
}

// Main loop
function gameLoop() {
  updateBall();
  updateAI();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();