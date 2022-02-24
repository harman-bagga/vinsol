import React, { useState, useEffect } from "react";
import "./common.css";
const Start = (props) => {
  const [allOperator, setAllOperator] = useState(["+", "-", "*", "/"]);
  const [questionNum, setQustionNum] = useState(20);
  const [operator, setOperator] = useState([]);
  const [error, setError] = useState("");
  const onsubmit = () => {
    if(operator.length<1){
      setError('Select a Operator')
      return;

    }
    if(questionNum<1){
      setError('Select a Number greater than 1')
      return
    }
   
    props.setInstrunstionInfo(props.quiz, questionNum,operator);
  };
  const selectOperator = (value) => {
    let op = operator;
    let index = op.indexOf(value);
    if (index === -1) {
      op.push(value);
    } else {
      op.splice(index, 1);
    }
    setOperator([...op]);
  };

  return (
    <div className="start-container">
      <h3 className="pb-4">Quiz {props.quiz==='q1'?1:2}</h3>
      <h5>Select a Operator</h5>
      <ul className="list-group operator">
        {allOperator.map((el) => {
          let color = "white";
          if (operator.includes(el)) {
            color = "#66d9e8";
          }else{
            color='white'
          }
          return (
            <li
              className="list-group-item text-center"
              style={{ backgroundColor: color }}
              onClick={() => selectOperator(el)}
              key={el}
            >
              operator : {el}
            </li>
          );
        })}
      </ul>
      <h5>Select Number of question</h5>
      <input
        type="number"
        value={questionNum}
        onChange={(value) => setQustionNum(value.target.value)}
        label="add "
      />
      <button
        onClick={onsubmit}
        type="button"
        className="btn start-btn"
      >
        Start
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default Start;
