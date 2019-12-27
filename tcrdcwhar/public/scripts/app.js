"use strict";

console.log("App.js is running!");

var app = {
  title: "Indecision App",
  subtitle: "Put your life in the hands of a computer",
  options: []
};
// const template = (
//   <div>
//     <h1>{app.title}</h1>
//     {app.subtitle && <p>{app.subtitle}</p>}
//     {app.options.length > 0 ? <p>Here are your options</p> : <p>No options</p>}
//     <ol>
//       <li>Item One</li>
//       <li>Item Two</li>
//     </ol>
//   </div>
// );

// const user = {
//   name: "Ledi",
//   age: 22,
//   location: "Samarinda"
// };
// function getLocation(location) {
//   if (location) {
//     return <p>Location: {location}</p>;
//   }
// }
// const templateTwo = (
//   <div>
//     <h1>{user.name ? user.name : "Anonymous"}</h1>
//     {user.age && user.age >= 18 && <p>Age: {user.age}</p>}
//     {getLocation(user.location)}
//   </div>
// );

// let count = 0;
// const addOne = () => {
//   count++;
//   renderCounterApp();
// };
// const minusOne = () => {
//   count--;
//   renderCounterApp();
// };
// const reset = () => {
//   count = 0;
//   renderCounterApp();
// };

var onFormSubmit = function onFormSubmit(e) {
  e.preventDefault();

  var option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    render();
  }
};

var onRemoveAll = function onRemoveAll(e) {
  app.options = [];
  render();
};

var makeDecision = function makeDecision() {
  var randomNum = Math.floor(Math.random() * app.options.length);
  var option = app.options[randomNum];
  alert(option);
};

var isNoOptions = function isNoOptions() {
  return app.options.length === 0;
};

var appRoot = document.getElementById("app");

var numbers = [23311, 745232, 8652343];
var visibility = false;

var toggleVisilibity = function toggleVisilibity() {
  visibility = !visibility;
  render();
};

// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//       <form onSubmit={onFormSubmit}>
//         <input type="text" name="option" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );

//   ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();

var render = function render() {
  var template = React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      app.title
    ),
    app.subtitle && React.createElement(
      "p",
      null,
      app.subtitle
    ),
    app.options.length > 0 ? React.createElement(
      "p",
      null,
      "Here are your options"
    ) : React.createElement(
      "p",
      null,
      "No options"
    ),
    React.createElement(
      "p",
      null,
      app.options.length
    ),
    React.createElement(
      "button",
      { disabled: isNoOptions(), onClick: makeDecision },
      "What Shoult I Do?"
    ),
    React.createElement(
      "button",
      { onClick: onRemoveAll },
      "Remove All Options"
    ),
    numbers.map(function (number, index) {
      return React.createElement(
        "p",
        { key: index },
        "Number: ",
        number
      );
    }),
    React.createElement(
      "ol",
      null,
      app.options.map(function (option, index) {
        return React.createElement(
          "li",
          { key: index },
          option
        );
      })
    ),
    React.createElement(
      "form",
      { onSubmit: onFormSubmit },
      React.createElement("input", { type: "text", name: "option" }),
      React.createElement(
        "button",
        { type: "submit" },
        "Submit"
      )
    ),
    React.createElement(
      "h2",
      null,
      "Visibility Toggle"
    ),
    React.createElement(
      "button",
      { onClick: toggleVisilibity },
      visibility ? "Hidden" : "Show",
      " details"
    ),
    visibility && React.createElement(
      "p",
      null,
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    )
  );

  ReactDOM.render(template, appRoot);
};

render();
