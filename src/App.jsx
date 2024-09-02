import React, { useState } from "react";
import "./App.css";
// import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import TodoHero from "./Components/TodoHero";
import Form from "./Components/Form";
import TodoLists from "./Components/TodoLists";
import { v4 as uuidv4 } from "uuid";

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
  };

  const editTodo = (id) => {
   setTodos(todos.title =
    todoItems.filter((item, index) => {
        return item.id === id;
      })
   )
   console.log(id)
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
          {/* <TodoList todos={[]}/> */}

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

{
  /* <header>
<h1>Counter app using State</h1>
</header>
<h2>Current value of count is {count}</h2>
<button onClick={() => setCount(0)}>Reset Counter</button>
<button onClick={() => (count > 10 ? "" : setCount(count + 1))}>Increase Counter</button>
<button onClick={() => (count < 1 ? "" : setCount(count - 1))}>Decrease Counter</button> */
}
