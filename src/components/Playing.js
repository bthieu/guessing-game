import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];

const Playing = () => {  
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [guessedWords, setGuessedWords] = useState(new Array(words.length).fill(false));
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess(currentWordIndex, true);
    } else if (event.key === 'Escape') {
      handleGuess(currentWordIndex, false);
    } else if (event.key === ' ') {
      handlePause();
    }
  };

  const handleGuess = (index, isCorrect) => {
    const updatedGuessedWords = [...guessedWords];
    updatedGuessedWords[index] = true;
    setGuessedWords(updatedGuessedWords);

    if (isCorrect) {
      setScore((value) => value + 1);
    }
    goToNextWord();
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const goToNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsEnded(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    setTimer(interval);

    return () => {
      clearInterval(interval); // Clear the timer when the component unmounts
    };
  }, [isPaused]);

  useEffect(() => {
    if (isEnded) {
    // End of game logic
    console.log('Game Over');
    clearInterval(timer); // Clear the timer when the game is over
    navigate('/result', { state: { score } });
    }
  }, [isEnded, timer, score]);

  useEffect(() => {
    if (timeRemaining === 0) {
      // handleEndGame();
      setIsEnded(true);
    }
  }, [timeRemaining, timer]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress); // Attach event listener to the window object

    return () => {
      window.removeEventListener('keyup', handleKeyPress); // Remove event listener when the component unmounts
    };
  }, [currentWordIndex]); // Empty dependency array to run only once during component mounting

  return (
    <div>
      <div>Score: {score}</div>
      <div>Time Remaining: {timeRemaining} seconds</div>
      <div>Word: {words[currentWordIndex]}</div>
      <ul className="word-list">
        {words.map((word, index) => (
          <li
            key={index}
            className={`word-list-item ${guessedWords[index] ? 'guessed' : ''} ${
              currentWordIndex === index ? 'current' : ''
            }`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playing;
