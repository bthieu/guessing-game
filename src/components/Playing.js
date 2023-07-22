import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utilities";

const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
];

const Playing = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [guessedWords, setGuessedWords] = useState(
    new Array(words.length).fill(undefined)
  );
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "Enter":
        handleGuess(currentWordIndex, true);
        break;
      case "Escape":
        handleGuess(currentWordIndex, false);
        break;
      case " ":
        handlePause();
        break;
      case "ArrowRight":
        goForward();
        break;
      case "ArrowLeft":
        goBack();
        break;
      default:
    }
  };

  const handleGuess = (index, isCorrect) => {
    if (isCorrect && !guessedWords[index]) {
      setScore((value) => value + 1);
    }
    const updatedGuessedWords = [...guessedWords];
    updatedGuessedWords[index] = isCorrect;
    setGuessedWords(updatedGuessedWords);
    goToNextWord();
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const goToNextWord = () => {
    const foundIndex = findNextWord();
    if (foundIndex !== -1) {
      setCurrentWordIndex(foundIndex);
      return;
    }
    setIsEnded(true);
  };

  const findNextWord = () => {
    const found = guessedWords.findIndex(
      (status, index) =>
        typeof status === "undefined" && index > currentWordIndex
    );
    if (found !== -1) {
      return found;
    }
    return guessedWords.findIndex(
      (status, index) =>
        typeof status === "undefined" && index < currentWordIndex
    );
  };

  const goForward = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((value) => value + 1);
    }
  };

  const goBack = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex((value) => value - 1);
    }
  };

  const goTo = (index) => {
    setCurrentWordIndex(index);
  };

  const getNavItemClasses = (status) => {
    return status === false
      ? "btn-danger"
      : status
        ? "btn-success"
        : "btn-outline-secondary";
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
      console.log("Game Over");
      clearInterval(timer); // Clear the timer when the game is over
      navigate("/result", { state: { score } });
    }
  }, [isEnded, timer, score]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsEnded(true);
    }
  }, [timeRemaining, timer]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress); // Attach event listener to the window object

    return () => {
      window.removeEventListener("keyup", handleKeyPress); // Remove event listener when the component unmounts
    };
  }, [currentWordIndex]); // Empty dependency array to run only once during component mounting

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        <ul className="word-indice col-12 col-lg-auto my-2 my-md-0 nav text-small">
          {words.map((word, index) => (
            <li
              key={index}
              className={`btn rounded-circle p-2 mx-1 lh-1 border-light-subtle border-3 opacity-50 ${getNavItemClasses(
                guessedWords[index]
              )} ${
                currentWordIndex === index
                  ? "border-dark-subtle opacity-100"
                  : ""
              }`}
              onClick={() => goTo(index)}
            >
              <div className="word-indice-item">{index + 1}</div>
            </li>
          ))}
        </ul>
        
        <div>
          <span class="display-6">{formatTime(timeRemaining)}</span>
        </div>
      </header>

      <section className="py-5">
      <div className="py-5 mx-auto text-center">
        <div className="display-1 fw-normal text-body-emphasis">
          {words[currentWordIndex]}
        </div>
      </div>  
      </section>

    </div>
  );
};

export default Playing;
