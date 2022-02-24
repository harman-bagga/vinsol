import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/question";
import Result from "./components/result";
import Start from "./components/start";

const App = () => {
  const [screen, setScreen] = useState({ q1: "start", q2: "start" });
  const [instruction, setInstruction] = useState({
    q1: { num: 20, selectedOperator: [] },
    q2: { num: 20, selectedOperator: [] },
  });
  const [quizList, setQuizList] = useState({ q1: [], q2: [] });

  const setInstrunstionInfo = (quiz, value, selectedOperator) => {
    if (value > 0) {
      setInstruction((prev) => {
        return { ...prev, [quiz]: { num: value, selectedOperator } };
      });
      setScreen((prev) => {
        return { ...prev, [quiz]: "question" };
      });
    }
  };
  const showResult = (quiz) => {
    setScreen((prev) => {
      return { ...prev, [quiz]: "result" };
    });
  };
  const addQuestion = (quiz, value) => {
    setQuizList((prev) => {
      return { ...prev, [quiz]: [...prev[quiz], value] };
    });
  };
  const changeScreen = (quiz, value) => {
    setScreen((prev) => {
      return { ...prev, [quiz]: value };
    });
    if (value === "start") {
      setInstruction(prev=>{
        return {...prev,[quiz]:{ num: 20, selectedOperator: [] }}
      })
      setQuizList(prev=>{
        return {...prev,[quiz]:[]}
      });
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col quiz1">
          {screen.q1 === "start" && (
            <Start quiz="q1" setInstrunstionInfo={setInstrunstionInfo} />
          )}
          {screen.q1 === "question" && (
            <Question
              quiz="q1"
              instruction={instruction.q1}
              addQuestion={addQuestion}
              instruction={instruction.q1}
              showResult={showResult}
              current={quizList.q1.length}
            />
          )}
          {screen.q1 === "result" && (
            <Result
              quiz="q1"
              quizList={quizList.q1}
              changeScreen={changeScreen}
            />
          )}
        </div>
        <div className="col quiz2">
          {screen.q2 === "start" && (
            <Start quiz="q2" setInstrunstionInfo={setInstrunstionInfo} />
          )}
          {screen.q2 === "question" && (
            <Question
              quiz="q2"
              instruction={instruction.q2}
              addQuestion={addQuestion}
              instruction={instruction.q2}
              showResult={showResult}
              current={quizList.q2.length}
            />
          )}
          {screen.q2 === "result" && (
            <Result
              quiz="q2"
              quizList={quizList.q2}
              changeScreen={changeScreen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
