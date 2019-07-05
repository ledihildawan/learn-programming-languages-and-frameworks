function getPrice(currency) {
  return `The price is ${currency}${this.price}`;
}

const intel = {
  name: 'Intel i7 3.5Ghz',
  price: 100,
  discount: 10,
  count: 50,
  getPrice: getPrice
};

const amd = {
  name: 'AMD A8 3.5Ghz',
  price: 75,
  discount: 10,
  count: 50,
  getPrice: getPrice,
  calcTotalPrice: function () {
    this.totalPrice = this.count * this.price;
    return this;
  },
  getTotalPrice: function () {
    return this.totalPrice;
  }
};

getPrice.apply(amd, ['$']);
getPrice.call(amd, '$');
intel.getPrice = getPrice.bind(intel);

// intel.getPrice();
// amd.getPrice();

function makeCounter() {
  let counter = 0;

  return function () {
    return ++counter;
  }
}

const counterState = makeCounter();

const module = (function () {
  let counter = 0;

  function setCounter(value) {
    counter = value;
  }

  function plusCounter() {
    counter++;
  }

  function getCounter() {
    return counter;
  }

  function reset() {
    counter = 0;
  }

  return {
    setCounter,
    plusCounter,
    getCounter,
    reset
  }
})();