let view = '';

function initialize() {
  let called = 0;

  return function () {
    if (view.length > 0) {
      return;
    } else {
      view = '⛰️';
      called++;
      console.log('view has bet set!');
    }
  };
}

const startOnce = initialize();

startOnce();
startOnce();
startOnce();
startOnce();
startOnce();
console.log(view);

const array = [1, 2, 3, 4];

for (let i = 0; i < array.length; i++) {
  setTimeout(() => {
    console.log(`I'm  at index ${array[i]}`);
  }, 3000);
}
