import React from "react";

const TodoHero = ({todosCompleted, totalTodos}) => {
  return (
    <>
      <div className="hero-section">
        <div className="">
            <h4>Task Done</h4>
            <h5>Keep It Up</h5>
        </div>
        <div className="count">
            <h1>{todosCompleted}/{totalTodos}</h1>
        </div>
      </div>
    </>
  );
};

export default TodoHero;
