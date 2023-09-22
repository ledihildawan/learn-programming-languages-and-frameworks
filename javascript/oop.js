// Object Literal
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
  this.radius = radius;
}

Circle.draw = () => {
  console.log('draw');
};

const circle3 = new Circle(1);

for (let key in circle3) {
  if (typeof circle[key] !== 'function') {
    console.log(key, circle3[key]);
  }
}

const keys = Object.keys(circle3);
console.log(keys);

if ('radius' in circle3) {
  console.log('Circle has a radius.');
}

// Exercise - Stopwatch
function Stopwatch() {
  let id = null;

  const time = {
    h: 0,
    m: 0,
    s: 0,
    ms: 0,
  };

  Object.defineProperty(this, 'duration', {
    get() {
      let value = '';

      if (time.h !== 0) {
        value += time.h.toString().padStart(2, '0') + ':';
      }

      if (time.m !== 0) {
        value += time.m.toString().padStart(2, '0') + ':';
      }

      value += time.s.toString().padStart(2, '0') + ':';
      value += time.ms.toString().padStart(2, '0');

      return value;
    },
  });

  this.start = function () {
    const milliseconds = 0;

    id = setInterval(() => {
      if (time.ms === 100) {
        time.ms = 0;
        time.s += 1;
      }

      if (time.s === 60) {
        time.s = 0;
        time.m += 1;
      }

      if (time.m === 60) {
        time.m = 0;
        time.h += 1;
      }

      time.ms += 1;
    }, milliseconds);
  };

  this.stop = function () {
    clearInterval(id);
  };
}

const sw = new Stopwatch();

sw.start();
sw.stop();
