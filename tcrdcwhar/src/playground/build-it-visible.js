class Visible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.visibilityToggle = this.visibilityToggle.bind(this);
  }

  visibilityToggle() {
    this.setState(() => {
      return {
        visibility: !this.state.visibility
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.visibilityToggle}>
          {this.state.visibility ? "Hide" : "Show"} details
        </button>
        {this.state.visibility && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            excepturi, saepe vel reiciendis officiis eos asperiores, expedita
            iste dolore laboriosam consectetur facere. Officia ipsam nemo eos
            quam animi temporibus nisi.
          </p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Visible />, document.getElementById("app"));
