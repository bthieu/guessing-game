import React, { useState } from "react";
import Playing from "./Playing";
import Home from "./Home";

const GuessingGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizzId, setQuizzId] = useState();
  const [score, setScore] = useState();

  const handleStartGame = (quizzId) => {
    setQuizzId(quizzId);
    setIsPlaying(true);
  };

  const handleEndGame = ({score}) => {
    setIsPlaying(false);
    setScore(score);
  };

  return (
    <div>
      {isPlaying ? (
        <Playing quizzId={quizzId} onEnd={handleEndGame} />
      ) : (
        <Home onStart={handleStartGame} score={score}/>
      )}
    </div>
  );
};

export default GuessingGame;
