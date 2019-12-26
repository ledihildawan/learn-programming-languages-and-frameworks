console.log("App.js is running!");

const app = {
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

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    renderAftersubmitted();
  }
};

const appRoot = document.getElementById("app");

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

const renderAftersubmitted = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      {app.options.length > 0 ? (
        <p>Here are your options</p>
      ) : (
        <p>No options</p>
      )}
      <p>{app.options.length}</p>
      <ol>
        <li>Item One</li>
        <li>Item Two</li>
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

renderAftersubmitted();
