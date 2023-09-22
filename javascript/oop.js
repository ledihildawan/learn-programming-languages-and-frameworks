// Object Literal
// - Not a good way to create and duplicate an object
const circle = {
  radius: 1,
  location: {
    x: 1,
    y: 1,
  },
  draw() {
    console.log('draw');
  },
};

circle.draw();

// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw() {
      console.log('draw');
    },
  };
}

const circle2 = createCircle(4);

// Constructor Function
function Circle(radius) {
  this.circle = radius;
}

Circle.draw = () => {
  console.log('draw');
};

const circle3 = new Circle(1);
