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

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    render();
  }
};

const onRemoveAll = e => {
  app.options = [];
  render();
};

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const isNoOptions = () => {
  return app.options.length === 0;
};

const appRoot = document.getElementById("app");

const numbers = [23311, 745232, 8652343];

const toggleVisilibity = () => {
  visibility = !visibility;
  render();
};

const render = () => {
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
      <button disabled={isNoOptions()} onClick={makeDecision}>
        What Shoult I Do?
      </button>
      <button onClick={onRemoveAll}>Remove All Options</button>
      {numbers.map((number, index) => (
        <p key={index}>Number: {number}</p>
      ))}
      <ol>
        {app.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
