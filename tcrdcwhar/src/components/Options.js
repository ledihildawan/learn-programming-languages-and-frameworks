import React from "react";

import Option from "./Option";

const Options = props => (
  <div>
    <button onClick={props.handleRemoveAllOptions}>Remove All</button>
    {props.options.length > 0 ? (
      <ul>
        {props.options.map(option => (
          <Option
            key={option}
            optionText={option}
            handleRemoveOption={props.handleRemoveOption}
          />
        ))}
      </ul>
    ) : (
      <p>Please add an option to get started!</p>
    )}
  </div>
);

export default Options;
