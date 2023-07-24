import React, { useState, useEffect } from "react";
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
const forbiddenWords = [["apple1"]];

const Playing = ({ onEnd, quizzId }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [guessedWords, setGuessedWords] = useState(
    new Array(words.length).fill(undefined)
  );
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  
  const handleKeyPress = (event) => {
    if (isPaused) {
      if (event.key === " ") {
        handlePause();
      }
      return;
    }

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
      clearInterval(timer); // Clear the timer when the game is over
      onEnd({ score });
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
  }, [currentWordIndex, isPaused]); // Empty dependency array to run only once during component mounting

  return (
    <div className="container">
      <header className="align-items-center d-flex flex-wrap justify-content-between py-3 mt-4">
        <ul className="bg-white col-12 col-lg-auto my-2 my-md-0 nav p-2 rounded-5 shadow text-small word-indice">
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

        <div className="bg-white px-4 py-2 rounded-5 shadow">
          <span className={`display-6 ${isPaused && "opacity-25"}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </header>

      {isPaused ? (
        <section className="py-5 my-4 rounded-5 shadow bg-white">
          <div className="mx-auto my-4 py-5 text-center">
            <div className="fw-bold py-5">Press space to start</div>
          </div>
        </section>
      ) : (
        <section className="py-5 my-4 rounded-5 shadow bg-white">
          <div className="py-5 my-4 mx-auto text-center">
            <div className="py-3 display-1 fw-semibold text-dark-emphasis">
              {words[currentWordIndex]}
            </div>
          </div>
          {forbiddenWords[currentWordIndex] &&
            forbiddenWords[currentWordIndex].length > 0 && (
              <div className="bg-white col-6 offset-1 p-3">
                <div className="fs-6 mb-2">FORBIDDEN WORDS</div>
                <div className="fs-3">
                  {forbiddenWords[currentWordIndex].map((fbnWord, index) => (
                    <div
                      key={index}
                      className="badge rounded-pill text-bg-danger me-2"
                    >
                      {fbnWord}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
      )}
    </div>
  );
};

export default Playing;
