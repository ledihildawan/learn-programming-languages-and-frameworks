const SHIPPING_COST = 10;

const fakeAPICharge = total => true;
const fakeSendRecipt = total => true;

const getSubTotal = cart => cart.reduce((tempTotal, item) => tempTotal * item);
const getTotal = subTotal => subTotal + SHIPPING_COST;
const sendRecipt = ({ email, total }) => {
  fakeSendRecipt({
    email,
    total
  });
};

const checkout = cart => {
  const subTotal = getSubTotal(cart);
  const total = getTotal(subTotal);
  const orderSuccess = fakeAPICharge(total);

  if (orderSuccess) {
    fakeSendRecipt({
      email: "fakeemail@gmail.com",
      total
    });
  }
};

checkout(total);