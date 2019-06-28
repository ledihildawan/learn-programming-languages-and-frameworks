import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ border: "5px solid green", height: "180px", overflowY: "scroll", backgroundColor: "red" }}>
      {props.children}
    </div>
  );
};

export default Scroll;