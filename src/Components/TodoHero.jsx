import React from "react";

const TodoHero = ({todosCompleted, totalTodos}) => {
  return (
    <>
      <div className="hero-section">
        <div className="">
            <h4 className="text-2xl">Task Done</h4>
            <h5 className="text-xl">Keep It Up</h5>
        </div>
        <div className="count text-4xl">
            <h1>{todosCompleted}/{totalTodos}</h1>
        </div>
      </div>
    </>
  );
};

export default TodoHero;
