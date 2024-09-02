import React, { useRef, useState, useEffect } from "react";

const List = (props) => {
  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);

  const completeTodo = () => {
    props.setTodoItems((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === props.list.id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      )
    );
  };
  const handleEdit = () => {
    setEdit(true);
  };
  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [edit]);
  const handleInpuSubmit = (event) => {
    event.preventDefault();
    setEdit(false);
  };
  const handleInputBlur = () => {
    setEdit(false);
  };
  const handleInputChange = (e) => {
    props.setTodoItems((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === props.list.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  return (
    <li
      id={props?.list?.id}
      className="list-item mt-3"
    >
      {edit ? (
        <form onSubmit={handleInpuSubmit} className="edit-form">
          <label htmlFor="edit-todo">
            <input
              className="edit-form"
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={props?.list?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <div className="d-flex checkNtext">
            <button
              className={
                props.list.isComplete ? "check-btn-fill" : "check-btn-border"
              }
              onClick={completeTodo}
            />

            <p
              style={props?.list?.isComplete ? { bacgroundColor: "#FFF" } : {}}
              className={
                props.list.isComplete
                  ? "todo-list-text-complete"
                  : "todo-list-text"
              }
            >
              {props.list.title}
            </p>
          </div>
          <div>
            <img
              src="images/edit.png"
              alt=""
              className="list-btn"
              onClick={handleEdit}
            />
            <img
              src="images/delete.png"
              alt=""
              className="list-btn"
              onClick={() => {
                props.deleteTodo(props.list.id);
              }}
            />
          </div>
        </>
      )}
    </li>
  );
};

const TodoLists = ({ items, deleteTodo, setTodoItems, editTodo }) => {
  return (
    <>
      <ol>
        {items && items.length > 0 ? (
          items.map((item, index) => {
            return (
              <List
                list={item}
                id={item.id}
                deleteTodo={deleteTodo}
                setTodoItems={setTodoItems}
                editTodo={editTodo}
              />
            );
          })
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
};

export default TodoLists;
