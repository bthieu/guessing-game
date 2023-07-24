import React, { useState } from "react";
import Playing from "./Playing";
import Home from "./Home";

const GuessingGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizzId, setQuizzId] = useState();
  const [score, setScore] = useState();
  const [timeLeft, setTimeLeft] = useState();

  const handleStartGame = (quizzId) => {
    setQuizzId(quizzId);
    setIsPlaying(true);
  };

  const handleEndGame = ({score, timeLeft}) => {
    setIsPlaying(false);
    setScore(score);
    setTimeLeft(timeLeft);
  };

  return (
    <div>
      {isPlaying ? (
        <Playing quizzId={quizzId} onEnd={handleEndGame} />
      ) : (
        <Home onStart={handleStartGame} score={score} timeLeft={timeLeft}/>
      )}
    </div>
  );
};

export default GuessingGame;
