import React, { useState } from "react";
import ListItems from "./Components/ListItems";
import { useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setTodos(e.target.value);
  };

  const ItemDelete = (id) => {
    setListItems((arrItems) => {
      return arrItems.filter((items, index) => {
        return index !== id;
      });
    });
  };

  const addItem = (e) => {
    setListItems((arrItems) => {
      return [...arrItems, todos];
    });
    setTodos("");
  };

  return (
    <>
      <header>
        <h1>Todo App</h1>
      </header>
      <div className="d-flex flex-row justify-center">
        <input
          placeholder="Write todo..."
          className="todo-input"
          value={todos}
          onChange={handleChange}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="my-8" style={{ width: "300px" }}>
        <h2>Todo list: 📝</h2>
        <ol>
          {listItems.map((itemsval, index) => {
            return (
              <ListItems
                id={index}
                key={index}
                text={itemsval}
                onSelect={ItemDelete}
                className="d-flex"
              />
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default TodoList;
// import React, { useRef, useState } from "react";

// const List = (props) => {
//   const [edit, setEdit] = useState(false);

//   const inputRef = useRef(null);

//   const completeTodo = () => {
//     props.setTodoItems((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === props.list.id
//           ? { ...todo, isComplete: !todo.isComplete }
//           : todo
//       )
//     );
//   };
//   const handleInputChange = (e) => {
//     props.setTodoItems((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === props.list.id ? { ...todo, title: e.target.value } : todo
//       )
//     );
//   };
//   const handleEdit = () => {
//     // setEdit(true);
//   }
//   React.useEffect(() => {
//     if (edit && inputRef.current) {
//       inputRef.current.focus();
//       // position the cursor at the end of the text
//       inputRef.current.setSelectionRange(
//         inputRef.current.value.length,
//         inputRef.current.value.length
//       );
//     }
//   }, [edit]);
//   const handleInpuSubmit = (event) => {
//     event.preventDefault();
//     setEdit(false);
//   };
//   const handleInputBlur = () => {
//     setEdit(false);
//   return (
//     <li id={props?.list?.id} className="list-item mt-3">
//       {edit ? (
//         <form  onSubmit={handleInpuSubmit}>
//         <label htmlFor="edit-todo">
//           <input
//             ref={inputRef}
//             type="text"
//             name="edit-todo"
//             id="edit-todo"
//             defaultValue={props.list.title}
//             onBlur={handleInputBlur}
//             onChange={handleInputChange}
//           />
//         </label>
//       </form>
//       ) : (
//         <div>
//         <div className="d-flex checkNtext">
//         <button
//           className={
//             props.list.isComplete ? "check-btn-fill" : "check-btn-border"
//           }
//           onClick={completeTodo}
//         />

//         <p
//           className={
//             props.list.isComplete ? "todo-list-text-complete" : "todo-list-text"
//           }
//         >
//           {props.list.title}
//         </p>
//       </div>
//       <div>
//         <img
//           src="images/edit.png"
//           alt=""
//           className="list-btn"
//           onClick={handleEdit}
//         />
//         <img
//           src="images/delete.png"
//           alt=""
//           className="list-btn"
//           onClick={() => {
//             props.deleteTodo(props.list.id);
//           }}
//         />
//       </div>
//       </div>
//       )}
   
//     </li>
//   );
// };
// };

// const TodoLists = ({ items, deleteTodo, setTodoItems, editTodo }) => {
//   return (
//     <>
//       <ol>
//         {items && items.length > 0 ? (
//           items.map((item, index) => {
//             return (
//               <List
//                 list={item}
//                 id={item.id}
//                 deleteTodo={deleteTodo}
//                 setTodoItems={setTodoItems}
//                 editTodo={editTodo}
//               />
//             );
//           })
//         ) : (
//           <p>Seems lonely in here, what are you up to?</p>
//         )}
//       </ol>
//     </>
//   );
// };

// export default TodoLists;

