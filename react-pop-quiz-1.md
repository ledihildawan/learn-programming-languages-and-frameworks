1. Where does React put all of the elements I create in JSX when I
   call `root.render()`?

React takes the JSX elements and renders them into the DOM inside the container element you passed to `ReactDOM.createRoot(container)`. So, if you did this:

```JS
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

The everything in `<App />` will be rendered inside the HTML element with ID `root`.

2. What would show up in my console if I were to run this line of code:

```
console.log(<h1>Hello world!</h1>)
```

This would log a **JavaScript object representation of a React element**, which looks something like this:

```JS
{
  type: "h1",
  props: {
    children: "Hello world!"
  },
  ...
}
```

So you won't see "Hello world!" printed as plain text. You'll see an object structure representing the virtual DOM node.

3. What's wrong with this code:

```
root.render(
    <h1>Hi there</h1>
    <p>This is my website!</p>
)
```

This is invalid because **you can't return two sibling JSX elements without wrapping them into a single parent element**.

4. What does it mean for something to be "declarative" instead of "imperative"?

- **Declarative** means you describe **what you want to happen**, not how to do it step by step. Example in React:

```JS
<button disabled={isLoading}>Submit</button>
```

- **Imperative** means you write out **exact instructions** to achieve a result. Example in vanilla JS:

```JS
const btn = document.querySelector("button");
if (isLoading) {
  btn.setAttribute("disabled", true);
} else {
  btn.removeAttribute("disabled");
}
```

React promotes a **declarative** style of programming.

5. What does it mean for something to be "composable"?

**Composable** means you can build complex things by combining smaller, reusable parts. In React, our components are composable. You can **nest and reuse** them to build large UIs. Example:

```JS
function Header() {
  return <h1>Welcome</h1>;
}

function App() {
  return (
    <div>
      <Header />
      <p>This is the app</p>
    </div>
  );
}
```

Here, `App` is composed of `Header` and other elements.
