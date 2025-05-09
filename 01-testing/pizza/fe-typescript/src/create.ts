import { Pizza, IPizza } from './models/pizza';

const form = document.querySelector('.create') as HTMLFormElement

form.addEventListener('submit', async (e) => {
	e.preventDefault()

	const data: FormData = new FormData(form);
	const newPizza: Partial<IPizza> = {
		price: parseInt(data.get('price') as string),
    title: data.get('title') as string,
		toppings: data.getAll('toppings') as string[],
		description: data.get('description') as string,
	}

	const res: Response = await Pizza.save(newPizza)

	if (!res.ok) {
		console.log('not able to save the pizza')
	}

	if (res.ok) {
		window.location.href = '/'
	}
})
