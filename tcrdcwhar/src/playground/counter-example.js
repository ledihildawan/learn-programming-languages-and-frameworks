class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count
    };
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("count");
      const count = parseInt(JSON.parse(json));

      if (count) {
        this.setState(() => ({ count }));
      }
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const json = JSON.stringify(this.state.count);
      localStorage.setItem("count", json);
    }
  }

  handleAddOne() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  handleMinusOne() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }

  handleReset() {
    this.setState(() => ({ count: 0 }));
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

Counter.defaultProps = {
  count: 0
};

ReactDOM.render(<Counter />, document.getElementById("app"));
