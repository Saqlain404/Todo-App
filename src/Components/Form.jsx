import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ todos, setTodos, todoItems, setTodoItems }) => {
  const handleChange = (item) => {
    setTodos(item.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = todos;
    if(value){
    setTodoItems((prev) => [
      ...prev,
      { title: value, id: uuidv4()},
    ]);
    setTodos("");}
    else{
        alert("Please write something")
    }
  };
  return (
    <>
      <div>
        <form action="" type="submit" className="todo-form">
          <input
            type="text"
            placeholder="Write your todo..."
            className="todo-input"
            value={todos}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleSubmit}>
            <img src="images/add.png" alt="" className="add-icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
