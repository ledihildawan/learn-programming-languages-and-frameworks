import React, { useState } from "react";

function FoodOrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`
      Order Successful!
      Your order was ${order}.
      Please show your confirmation number for pickup.
    `);

    setName("");
    setPhone("");
    setOrder("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label for="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label for="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label for="order">Order</label>
        <input
          id="order"
          name="order"
          value={order}
          onChange={e => setOrder(e.target.value)}
        />
      </div>
      <button type="submit">Submit Order</button>
    </form>
  )
}

export default FoodOrderForm;