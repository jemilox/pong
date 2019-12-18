function setup() {
  var canvas = createCanvas(1000, 1000);
  canvas.parent('canvas-holder');
}
function scoreBoard(player1Score, player2Score) {
  textSize(32);
  text(player1Score, 400, 30);
  text(player2Score, 575, 30);
}
function paddle(xPosition, yPosition) {
   rect(xPosition, yPosition, 10, paddleHeight);
}
function ball(xPosition, yPosition) {
  ellipse(xPosition, yPosition, 10, 10);
}
var paddleHeight = 75;
var player1YPosition = 500;
var player1XPosition = 15;
var player1Score = 0;
var player2YPosition = 500;
var player2XPosition = 975;
var player2Score = 0;
var ballXPosition = 500;
var ballYPosition = 500;
var random = Math.random();
var randomSign = Math.random() > .5 ? -1 : 1;
var maxSpeed = 5;
var playerMoveSpeed = 8;
var ballXSpeed = (maxSpeed/2 + (maxSpeed/2 - maxSpeed * random)) * randomSign;
var ballYSpeed = (maxSpeed/2) * random * randomSign;
console.log(random, randomSign, ballXSpeed, ballYSpeed);
var random = Math.random();
function didBallHitSideWall() {
  if(
    ballYPosition >= 1000 ||
    ballYPosition <= 0
  ) {
    ballYSpeed = ballYSpeed * - 1;
  }
}
function didBallHitPlayer2() {
  if(
     ballYPosition >= player2YPosition &&
     ballYPosition <= player2YPosition + paddleHeight &&
     ballXPosition >= player2XPosition
  ) {
     bounce(player2YPosition);
  }
}
function didBallHitPlayer1() {
  if(
     ballYPosition >= player1YPosition &&
     ballYPosition <= player1YPosition + paddleHeight &&
     ballXPosition <= player1XPosition + 10
  ) {
    bounce(player1YPosition);
  }
}
function bounce(playerYPosition) {
    var direction = Math.sign(ballXSpeed) * - 1;
    var ballDistanceToCenterOfPaddle = Math.abs(playerYPosition + (paddleHeight / 2) - ballYPosition);
    var ballYSpeedRatio = ballDistanceToCenterOfPaddle / (paddleHeight / 2);
    
    ballXSpeed = (maxSpeed/2 + (maxSpeed/2 - maxSpeed/2 * ballYSpeedRatio)) * direction;
    ballYSpeed = maxSpeed/2 * ballYSpeedRatio * Math.sign(ballYSpeed); 
    console.log(ballDistanceToCenterOfPaddle, ballYSpeedRatio, direction, ballXSpeed, ballYSpeed);
}
function resetBall() {
  ballYPosition = 500;
  ballXPosition = 500;
  ballXSpeed = ballXSpeed * -1;
}

function didPlayer2Score() {
}
function didPlayer1Score() {
}
function movePlayer1() {
}
function movePlayer2() {
}

var i = 0;
function draw() {
  if(i > 10000) return;
  i++;
  //Make the game board black
  background('black');
  
  //Make the objects in the game white
  fill(255, 255, 255);
  
  scoreBoard(player1Score, player2Score);
  
  ball(ballXPosition, ballYPosition);
  paddle(player1XPosition, player1YPosition);
  paddle(player2XPosition, player2YPosition);
  
  didBallHitPlayer1();
  didPlayer1Score();
 
  didBallHitPlayer2();
  didPlayer2Score();
  
  didBallHitSideWall();
  
  movePlayer1();
  movePlayer2();
  console.log(ballXSpeed, ballYSpeed);
  ballXPosition = ballXPosition + ballXSpeed;
  ballYPosition = ballYPosition + ballYSpeed;
}