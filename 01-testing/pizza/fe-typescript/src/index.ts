import { ResponseOk } from './models/status-code'
import { Pizza, IPizza  } from './models/pizza'

const rootElement: HTMLElement = document.querySelector('.root')!

function createPizzaTemplate(pizza: IPizza): string {
	return `
    <div class="pizza">
      <h2>${pizza.title}...</h2>
      <p class="toppings">${pizza.toppings.join(', ')}</p>
      <p>${pizza.description}</p>
      <span>£${pizza.price}</span>
    </div>
  `
}

function renderTemplates(templates: string[], parent: Element): void {
	const templateElement = document.createElement('template')

	for (const t of templates) {
		templateElement.innerHTML += t
	}

	parent.append(templateElement.content)
}

document.addEventListener('DOMContentLoaded', async () => {
	const res: ResponseOk<IPizza> = await Pizza.loadAll();
	const pizzaTemplates: string[] = res.items.map(createPizzaTemplate);

	renderTemplates(pizzaTemplates, rootElement);
});
