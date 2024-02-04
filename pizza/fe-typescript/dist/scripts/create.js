import { Pizza } from './models/pizza.js';
const form = document.querySelector('.create');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const newPizza = {
        price: parseInt(data.get('price')),
        title: data.get('title'),
        toppings: data.getAll('toppings'),
        description: data.get('description'),
    };
    const res = await Pizza.save(newPizza);
    if (!res.ok) {
        console.log('not able to save the pizza');
    }
    if (res.ok) {
        window.location.href = '/';
    }
});
