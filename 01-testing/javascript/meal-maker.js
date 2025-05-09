const menu = {
  _meal: '',
  _price: 0,

  set meal(mealToCheck) {
    if (typeof mealToCheck === 'string') {
      this._meal = mealToCheck;
    } else {
      console.log('Meal must be a string');
    }
  },
  set price(priceToCheck) {
    if (typeof priceToCheck === 'number') {
      this._price = priceToCheck;
    } else {
      console.log('Price must be a number');
    }
  },
  get todaysSpecial() {
    if (this._meal && this._price) {
      return `Today's Special is ${this._meal} for $${this._price}!`;
    } else {
      return 'Meal or price was not set correctly!';
    }
  }
};

menu._meal = 10; // This shouldn't be allowed in practice
menu._price = 'Free'; // This shouldn't be allowed in practice
console.log(menu); // You will see invalid assignments here

menu.meal = 'Spaghetti';
menu.price = 10;

console.log(menu.todaysSpecial);
