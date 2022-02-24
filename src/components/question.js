import { Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./common.css";

const Question = (props) => {
  const [question, setQuestion] = useState({
    num1: null,
    num2: null,
    ans: null,
    userAns: null,
    operator: null,
  });
  const [operators, setOperators] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [num, setNum] = useState(0);
  useEffect(() => {
    generateQuestion([...props.instruction.selectedOperator]);
    setOperators([...props.instruction.selectedOperator]);
  }, [props.instruction]);
  useEffect(() => {
    if (operators.length > 0) {
      setIsChange(false);
      generateQuestion(operators);
      setNum(0);
    }
  }, [props.current]);
  const generateQuestion = (oper) => {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    let op = Math.floor(Math.random() * oper.length);
    if (operators[op] === "/" && num2 === 0) {
      num2 = Math.floor(Math.random() * 10);
    }
    setQuestion({
      ...question,
      num1,
      num2,
      operator: oper[op],
      ans: questionAnswer(num1, num2, oper[op]),
    });
  };
  const questionAnswer = (num1, num2, value) => {
    if (value === "+") {
      return num1 + num2;
    } else if (value === "-") {
      return num1 - num2;
    } else if (value === "*") {
      return num1 * num2;
    } else if (value === "/") {
      return (num1 / num2).toFixed(2);
    }
  };

  const onsubmit = () => {
    let userAns;

    if (isChange) {
      userAns = num;
    } else {
      userAns = undefined;
    }
    props.addQuestion(props.quiz, { ...question, userAns });
  };
  return (
    <div className="container">
      <p>
        Q :Solve {question.num1} {question.operator} {question.num2}{" "}
      </p>
      <input
        type="number"
        value={num}
        onChange={(value) => {
          setNum(value.target.value);
          setIsChange(true);
        }}
      />
      {question.operator === "/" && (
        <p className="mt-2">Round off number to 2 digit decimals places </p>
      )}
      {props.instruction.num - 1 > props.current && (
        <button
          onClick={onsubmit}
          type="button"
          className="btn btn-primary start-btn"
        >
          Next
        </button>
      )}
      <button
        onClick={() => {
          setIsChange(false);
          setNum(0);
        }}
        type="button"
        className="btn btn-secondary "
      >
        Reset
      </button>
      {props.instruction.num - 1 === props.current && (
        <button
          onClick={() => {
            onsubmit();
            props.showResult(props.quiz);
          }}
          className="btn btn-success start-btn"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Question;
