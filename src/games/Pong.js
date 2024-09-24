import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Pong = () => {
  const [ballX, setBallX] = useState(400);
  const [ballY, setBallY] = useState(300);
  const [ballDX, setBallDX] = useState(4);
  const [ballDY, setBallDY] = useState(4);
  const [playerY, setPlayerY] = useState(250);
  const [aiY, setAiY] = useState(250);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [keysPressed, setKeysPressed] = useState({});
  const gameRef = useRef(null);

  const paddleHeight = 100;
  const paddleWidth = 10;
  const ballSize = 10;
  const canvasWidth = 800;
  const canvasHeight = 600;
  const aiMaxSpeed = 7; // Increased AI speed
  const playerSpeed = 10;
  const borderWidth = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
      moveAI();
      handlePlayerMovement();
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [ballX, ballY, ballDX, ballDY, playerY, aiY, keysPressed]);

  const moveBall = () => {
    let newBallX = ballX + ballDX;
    let newBallY = ballY + ballDY;

    // Ball hits the top or bottom borders
    if (
      newBallY <= borderWidth ||
      newBallY + ballSize >= canvasHeight - borderWidth
    ) {
      setBallDY(-ballDY);
      newBallY =
        newBallY <= borderWidth
          ? borderWidth
          : canvasHeight - borderWidth - ballSize;
    }

    // Ball hits the left paddle (Player)
    if (
      newBallX <= paddleWidth + borderWidth &&
      newBallY + ballSize >= playerY &&
      newBallY <= playerY + paddleHeight
    ) {
      setBallDX(-ballDX);
      newBallX = paddleWidth + borderWidth;
    }

    // Ball hits the right paddle (AI)
    if (
      newBallX + ballSize >= canvasWidth - paddleWidth - borderWidth &&
      newBallY + ballSize >= aiY &&
      newBallY <= aiY + paddleHeight
    ) {
      setBallDX(-ballDX);
      newBallX = canvasWidth - paddleWidth - borderWidth - ballSize;
    }

    // Ball goes out on the left (AI scores)
    if (newBallX <= borderWidth) {
      setAiScore(aiScore + 1);
      resetBall();
      return;
    }

    // Ball goes out on the right (Player scores)
    if (newBallX + ballSize >= canvasWidth - borderWidth) {
      setPlayerScore(playerScore + 1);
      resetBall();
      return;
    }

    setBallX(newBallX);
    setBallY(newBallY);
  };

  const moveAI = () => {
    const aiCenter = aiY + paddleHeight / 2;
    const ballCenter = ballY + ballSize / 2;
    const difference = ballCenter - aiCenter;

    // Predict where the ball will be when it reaches the AI's side
    const timeToReach =
      (canvasWidth - ballX - paddleWidth - borderWidth) / Math.abs(ballDX);
    const predictedY = ballY + ballDY * timeToReach;

    // Move towards the predicted position
    const targetY = predictedY - paddleHeight / 2;
    const aiSpeed = Math.min(Math.abs(targetY - aiY), aiMaxSpeed);

    if (targetY > aiY) {
      setAiY(
        Math.min(aiY + aiSpeed, canvasHeight - paddleHeight - borderWidth)
      );
    } else {
      setAiY(Math.max(aiY - aiSpeed, borderWidth));
    }
  };

  const resetBall = () => {
    setBallX(canvasWidth / 2);
    setBallY(canvasHeight / 2);
    setBallDX(-ballDX);
  };

  const handlePlayerMovement = () => {
    if (keysPressed.ArrowUp) {
      setPlayerY((prevY) => Math.max(prevY - playerSpeed, borderWidth));
    }
    if (keysPressed.ArrowDown) {
      setPlayerY((prevY) =>
        Math.min(prevY + playerSpeed, canvasHeight - paddleHeight - borderWidth)
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className="pong-game"
      ref={gameRef}
      style={{
        border: `${borderWidth}px solid white`,
        width: canvasWidth + borderWidth * 2,
        height: canvasHeight + borderWidth * 2,
        boxSizing: "border-box",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <div
        className="score"
        style={{
          position: "absolute",
          top: "-30px",
          left: "0",
          right: "0",
          textAlign: "center",
          fontSize: "24px",
          color: "white",
        }}
      >
        <span>{playerScore}</span> - <span>{aiScore}</span>
      </div>
      <svg
        width={canvasWidth}
        height={canvasHeight}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        style={{ position: "absolute", top: borderWidth, left: borderWidth }}
      >
        {/* Player Paddle */}
        <rect
          x={borderWidth}
          y={playerY}
          width={paddleWidth}
          height={paddleHeight}
          fill="white"
        />
        {/* AI Paddle */}
        <rect
          x={canvasWidth - paddleWidth - borderWidth}
          y={aiY}
          width={paddleWidth}
          height={paddleHeight}
          fill="white"
        />
        {/* Ball */}
        <circle cx={ballX} cy={ballY} r={ballSize / 2} fill="white" />
        {/* Center line */}
        <line
          x1={canvasWidth / 2}
          y1={0}
          x2={canvasWidth / 2}
          y2={canvasHeight}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="10,10"
        />
      </svg>
    </div>
  );
};

export default Pong;
