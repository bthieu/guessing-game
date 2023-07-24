import React from "react";

const Home = ({ onStart, score }) => {
  return (
    <section className="container">
      <div className="bg-white col-6 mt-5 offset-3 p-5 rounded-5 shadow text-center">
        {typeof score === "undefined" ? (
          <div>
            <h1>Word Guessing</h1>
            <p>Choose a quizz to start</p>
          </div>
        ) : (
          <div>
            <h1>Score</h1>
            <p className="display-3 fw-bolder">{score}</p>
            <p>Choose a quizz to start again</p>
          </div>
        )}
        <div className="col-6 d-grid gap-4 my-4 offset-3">
          <button className="btn btn-primary" onClick={() => onStart(0)}>
            Quizz No. 1
          </button>
          <button className="btn btn-primary" onClick={() => onStart(1)}>
            Quizz No. 2
          </button>
          <button className="btn btn-primary" onClick={() => onStart(2)}>
            Quizz No. 3
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
