import React from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo added successfully",
      showConfirmButton: false,
      timer: 1500,
      width: "300px",  // Reduced width for a smaller look
      padding: "0.75rem",  // Minimal padding
      customClass: {
        popup: 'minimal-swal-popup',  // Custom class for further styling
      },
      backdrop: true,  // No backdrop for a cleaner look
    });
    setTodos("");}
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Please write something...',
        icon: 'error',
        color: "#fff",
        background: '#2F363F',
        confirmButtonColor: "#75da8b",
      })
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
