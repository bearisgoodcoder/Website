import React, { useState, useEffect, useCallback } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

const TETROMINOS = [
  { shape: [
    [1, 1, 1, 1]
  ], 
  color: "cyan" 
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "purple",
  },
  {
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: "orange",
  },
  {
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    color: "blue",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
];

const Tetris = () => {
  const [board, setBoard] = useState(
    Array(BOARD_HEIGHT)
      .fill()
      .map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const createNewPiece = useCallback(() => {
    const randomPiece =
      TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
    setCurrentPiece(randomPiece);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  }, []);

  const moveDown = useCallback(() => {
    if (!currentPiece) return;

    const newPosition = { ...position, y: position.y + 1 };

    if (isCollision(currentPiece.shape, newPosition)) {
      // Place the piece on the board
      const newBoard = [...board];
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + position.y][x + position.x] = currentPiece.color;
          }
        });
      });
      setBoard(newBoard);

      // Check for completed rows
      const completedRows = newBoard.filter((row) =>
        row.every((cell) => cell !== 0)
      );
      if (completedRows.length > 0) {
        const newRows = Array(completedRows.length)
          .fill()
          .map(() => Array(BOARD_WIDTH).fill(0));
        setBoard([
          ...newRows,
          ...newBoard.filter((row) => !row.every((cell) => cell !== 0)),
        ]);
        setScore((prevScore) => prevScore + completedRows.length * 100);
      }

      createNewPiece();
    } else {
      setPosition(newPosition);
    }
  }, [board, currentPiece, position, createNewPiece]);

  const isCollision = (shape, newPosition) => {
    return shape.some((row, y) =>
      row.some(
        (value, x) =>
          value !== 0 &&
          (board[y + newPosition.y] === undefined ||
            board[y + newPosition.y][x + newPosition.x] === undefined ||
            board[y + newPosition.y][x + newPosition.x] !== 0)
      )
    );
  };

  const rotate = () => {
    if (!currentPiece) return;

    const rotatedShape = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map((row) => row[index]).reverse()
    );

    // Check collision after rotation
    if (!isCollision(rotatedShape, position)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  };

  const moveHorizontal = (direction) => {
    if (!currentPiece) return;

    const newPosition = { ...position, x: position.x + direction };

    if (!isCollision(currentPiece.shape, newPosition)) {
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    if (gameOver) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          moveHorizontal(-1);
          break;
        case "ArrowRight":
          moveHorizontal(1);
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp":
          rotate();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const gameInterval = setInterval(() => {
      moveDown();
    }, 1000);

    if (!currentPiece) createNewPiece();

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [currentPiece, moveDown, createNewPiece, gameOver]);

  useEffect(() => {
    if (board[0].some((cell) => cell !== 0)) {
      setGameOver(true);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill()
        .map(() => Array(BOARD_WIDTH).fill(0))
    );
    setCurrentPiece(null);
    setPosition({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    createNewPiece();
  };

  return (
    <div
      style={{
        position: "relative",
        width: BOARD_WIDTH * BLOCK_SIZE,
        height: BOARD_HEIGHT * BLOCK_SIZE,
        border: "1px solid black",
      }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x},${y}`}
            style={{
              position: "absolute",
              left: x * BLOCK_SIZE,
              top: y * BLOCK_SIZE,
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: cell || "white",
              border: "1px solid #ddd",
            }}
          />
        ))
      )}
      {currentPiece &&
        currentPiece.shape.map((row, y) =>
          row.map(
            (cell, x) =>
              cell !== 0 && (
                <div
                  key={`piece-${x},${y}`}
                  style={{
                    position: "absolute",
                    left: (position.x + x) * BLOCK_SIZE,
                    top: (position.y + y) * BLOCK_SIZE,
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                    backgroundColor: currentPiece.color,
                    border: "1px solid #ddd",
                  }}
                />
              )
          )
        )}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          left: "0",
          color: "black",
        }}
      >
        Score: {score}
      </div>
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Tetris;
