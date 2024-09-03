import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import TodoHero from "./Components/TodoHero";
import Form from "./Components/Form";
import TodoLists from "./Components/TodoLists";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  console.log({ todoItems, todos }, todoItems);

  const totalTodos = todoItems.length;
  const todosCompleted = todoItems.filter((todo)=>
  todo.isComplete === true).length;

  const deleteTodo = (id) => {
    setTodoItems((arrItems) => {
      return arrItems.filter((item, index) => {
        return item.id !== id;
      });
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo deleted successfully",
      showConfirmButton: false,
      timer: 1500,
      width: "300px",  // Reduced width for a smaller look
      padding: "0.75rem",  // Minimal padding
      customClass: {
        popup: 'minimal-swal-popup',  // Custom class for further styling
      },
      backdrop: true,  // No backdrop for a cleaner look
    });
  };

  const editTodo = (id) => {
   setTodos(todos.title =
    todoItems.filter((item, index) => {
        return item.id === id;
      })
   )
   
  }
  

  return (
    <>
      <div className="App">
        <div className="home">
          <Header />
          <TodoHero todosCompleted={todosCompleted} totalTodos={totalTodos} />

          <Form
            todos={todos}
            setTodos={setTodos}
            setTodoItems={setTodoItems}
            todoItems={todoItems}
          />

          <TodoLists
            className="mt-4"
            items={todoItems}
            deleteTodo={deleteTodo}
            setTodoItems={setTodoItems}
            editTodo={editTodo}
          />
        </div>
      </div>
    </>
  );
}

export default App;

