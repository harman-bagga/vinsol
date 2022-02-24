import { Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./common.css";

const Result = (props) => {
  const [score,setScore]=useState({score:0,total:0})
  useEffect(()=>{
    countScore()
  },[props.quizList])
  const countScore=()=>{
  let val=  props.quizList.reduce((prev,currentValue)=>{
      if(Number(currentValue.userAns)===Number(currentValue.ans)){

        return ++prev
      }else{
        return prev
      }
      
    },0)
    setScore({score:val,total:props.quizList.length})
  }
  return (
    <div className="container">
      <h5>Result</h5>
      <p>Score  {score.score} / {score.total}</p>
      <ul className="list-group">
        {props.quizList &&
          props.quizList.map((el, index) => {
            let color = "red";
            if (Number(el.userAns) === Number(el.ans)) {
              color = "green";
            } else {
              color = "red";
            }
            return (
              <React.Fragment>
                <li
                  key={index}
                  className="list-group-item d-flex flex-column"
                  style={{ backgroundColor: color }}
                >
                  {" "}
                  <div className="">
                    Question {index} : {el.num1} {el.operator} {el.num2}
                  </div>
                  <div>Answer : {el.ans}</div>
                  <div>
                    Your Answer : {el.userAns ? el.userAns : "Not Attempted "}
                  </div>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
      <button
        onClick={() => props.changeScreen(props.quiz, "start")}
        type="button"
        className="btn btn-primary start-btn"
      >
        Start Again
      </button>
    </div>
  );
};

export default Result;
