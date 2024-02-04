import { Pizza } from './models/pizza.js';
const rootElement = document.querySelector('.root');
function createPizzaTemplate(pizza) {
    return `
    <div class="pizza">
      <h2>${pizza.title}...</h2>
      <p class="toppings">${pizza.toppings.join(', ')}</p>
      <p>${pizza.description}</p>
      <span>£${pizza.price}</span>
    </div>
  `;
}
function renderTemplates(templates, parent) {
    const templateElement = document.createElement('template');
    for (const t of templates) {
        templateElement.innerHTML += t;
    }
    parent.append(templateElement.content);
}
document.addEventListener('DOMContentLoaded', async () => {
    const res = await Pizza.loadAll();
    const pizzaTemplates = res.items.map(createPizzaTemplate);
    renderTemplates(pizzaTemplates, rootElement);
});
