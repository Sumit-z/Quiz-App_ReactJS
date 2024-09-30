import { useState, useRef } from "react";
import "./Question.css";
import { data } from "../store/data";

function Question() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [correctCount, setCurrectCount] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let arrOption = [Option1, Option2, Option3, Option4];

  const isCorrect = (element, ans) => {
    if (lock === false) {
      if (ans === question.ans) {
        element.target.classList.add("correct");
        setLock(true);
        setCurrectCount((prev) => prev + 1);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        arrOption[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      arrOption.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const handleReset = () =>{
    setIndex(0);
    setQuestion(data[0]);
    setCurrectCount(0);
    setLock(false);
    setResult(false);
  }
  return (
    <div className="card question-card" style={{ width: "18rem" }}>
      <div className="card-body my-question">
        <h5 className="card-title my-title">Quiz App</h5>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <p className="card-text">
              {index + 1} . {question.question}
            </p>
            <a
              href="#"
              ref={Option1}
              onClick={(element) => {
                isCorrect(element, 1);
              }}
              className="my-options btn btn-outline-secondary"
            >
              {question.option1}
            </a>
            <a
              href="#"
              ref={Option2}
              onClick={(element) => {
                isCorrect(element, 2);
              }}
              className="my-options btn btn-outline-secondary"
            >
              {question.option2}
            </a>
            <a
              href="#"
              ref={Option3}
              onClick={(element) => {
                isCorrect(element, 3);
              }}
              className="my-options btn btn-outline-secondary"
            >
              {question.option3}
            </a>
            <a
              href="#"
              ref={Option4}
              onClick={(element) => {
                isCorrect(element, 4);
              }}
              className="my-options btn btn-outline-secondary"
            >
              {question.option4}
            </a>
            <button
              onClick={nextQuestion}
              type="button"
              className="btn btn-primary next-button"
            >
              Next
            </button>
            <div className="index">
              {index + 1} of {data.length} Questions
            </div>
          </>
        )}
        {result ? <><h2>Your Score is {correctCount} out of {data.length}</h2>
        <button
              onClick={handleReset}
              type="button"
              className="btn btn-primary next-button"
            >
              Reset
            </button></> : <></>}
        
      </div>
    </div>
  );
}
export default Question;
