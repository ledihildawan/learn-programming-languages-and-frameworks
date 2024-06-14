export class DataResource<T> {
	constructor(private endpoint: string) {}

  async save(data: T): Promise<Response> {
		const res: Response = await fetch(this.endpoint, {
            body: JSON.stringify(data),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});

		return res;
	}

  async delete(id: string): Promise<Response> {
		const res: Response = await fetch(`${this.endpoint}/${id}`, {
			method: 'DELETE',
		})

		return res;
	}

	async loadAll(): Promise<T> {
		const res: Response = await fetch(this.endpoint)

		return res.json();
	}

	async loadOne(id: string): Promise<T> {
		const res: Response = await fetch(`${this.endpoint}/${id}`)

		return res.json();
	}
}
