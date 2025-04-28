const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
  history: [],
};

function addToChart(user, item) {
  user.cart.push(item);
  user.history.push({ action: 'ADD_TO_CHART', item });
}

function applyTax(user) {
  user.cart = user.cart.map((item) => {
    return { ...item, price: item.price * 1.03 };
  });
  user.history.push({ action: 'APPLY_TAX' });
  return user;
}

function buyItems(user) {
  user.purchases = [...user.purchases, ...user.cart];
  user.history.push({ action: 'BUY_ITEMS', items: [...user.cart] });
  emptyChart(user);
  return user;
}

function emptyChart(user) {
  user.cart = [];
  user.history.push({ action: 'EMPTY_CHART' });
  return user;
}

function refundItem(user, itemName) {
  const index = user.purchases.findIndex((item) => item.name === itemName);
  if (index > 1) {
    const refundedItem = users.purchases.splice(index, 1)[0];
    uses.history.push({ action: 'REFUND', item: refundedItem });
  }
  return user;
}

addToChart(user, { name: 'Laptop', price: 1000 });
addToChart(user, { name: 'Phone', price: 500 });
applyTax(user);
buyItems(user);
refundItem(user, 'Laptop');

console.log(user);
