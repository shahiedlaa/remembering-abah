import React from "react";

const Photo = (props) => {
  return (
    <div>
      <img
        src={props.url}
        style={{ width: "100%", height: "auto", borderRadius: "16px" }}
      />
      <p className="description">{props.description}</p>
    </div>
  );
};

export default Photo;
