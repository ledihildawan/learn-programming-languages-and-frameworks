"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Visible = function (_React$Component) {
  _inherits(Visible, _React$Component);

  function Visible(props) {
    _classCallCheck(this, Visible);

    var _this = _possibleConstructorReturn(this, (Visible.__proto__ || Object.getPrototypeOf(Visible)).call(this, props));

    _this.state = {
      visibility: false
    };
    _this.visibilityToggle = _this.visibilityToggle.bind(_this);
    return _this;
  }

  _createClass(Visible, [{
    key: "visibilityToggle",
    value: function visibilityToggle() {
      var _this2 = this;

      this.setState(function () {
        return {
          visibility: !_this2.state.visibility
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Visibility Toggle"
        ),
        React.createElement(
          "button",
          { onClick: this.visibilityToggle },
          this.state.visibility ? "Hide" : "Show",
          " details"
        ),
        this.state.visibility && React.createElement(
          "p",
          null,
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto excepturi, saepe vel reiciendis officiis eos asperiores, expedita iste dolore laboriosam consectetur facere. Officia ipsam nemo eos quam animi temporibus nisi."
        )
      );
    }
  }]);

  return Visible;
}(React.Component);

ReactDOM.render(React.createElement(Visible, null), document.getElementById("app"));

// const appRoot = document.getElementById("app");

// let visibility = false;

// const visibilityToggle = () => {
//   visibility = !visibility;
//   render();
// };

// const render = () => {
//   const jsx = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={visibilityToggle}>
//         {visibility ? "Hide" : "Show"} details
//       </button>
//       {visibility && (
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
//           excepturi, saepe vel reiciendis officiis eos asperiores, expedita iste
//           dolore laboriosam consectetur facere. Officia ipsam nemo eos quam
//           animi temporibus nisi.
//         </p>
//       )}
//     </div>
//   );

//   ReactDOM.render(jsx, appRoot);
// };

// render();
