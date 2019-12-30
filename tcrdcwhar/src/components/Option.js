import React from "react";

const Option = props => (
  <li>
    {props.optionText}
    <button
      onClick={() => {
        props.handleRemoveOption(props.optionText);
      }}
    >
      Remove
    </button>
  </li>
);

export default Option;
