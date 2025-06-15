1. What is a React component?

A **React component** is reusable, self-contained block of code that returns **React elements** (usually JSX) to describe what should appear on the screen. It can be either:

- **Functional** (like `function MyComponent() {}`), preferred in modern React.
- **Class-based** (less common now).

2. What's wrong with this code?

```JS
function myComponent() {
    return (
        <small>I'm tiny text!</small>
    )
}
```

**Issue**: Component names **must start with an uppercase letter** in React.

React treats lowercase tags like `<div>` as HTML elements, not components. So `myComponent` sholud be renamed:

```JS
function MyComponent() {
    return (
        <small>I'm tiny text!</small>
    )
}
```

3. What's wrong with this code?

```JS
function Header() {
    return (
        <header>
            <img src="./react-logo.png" width="40px" alt="React logo" />
        </header>
    )
}

root.render(Header())
```

**Issue**: You're calling `Header()` directly, which returns a React element, but React expects a component to be passed **as a JSX element** or wrapped in `React.createElement`.

✅ Fix:

```JS
root.render(<Header />)
```

Or if not using JSX:

```JS
root.render(React.createElement(Header));
```
