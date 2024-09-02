import React from "react";

const ListItems = (props) => {
  return (
    <>
      <div className="d-flex justify-center">
          <img
            src="images/delete-svgrepo-com.svg"
            alt="delete"
            style={{ width: "20px" }}
            onClick={() => {props.onSelect(props.id)}}
          />
        <li className="decoration-none">{props.text}</li>
        
      </div>
    </>
  );
};

export default ListItems;
