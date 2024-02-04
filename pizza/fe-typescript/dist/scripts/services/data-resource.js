export class DataResource {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    async save(data) {
        const res = await fetch(this.endpoint, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        return res;
    }
    async delete(id) {
        const res = await fetch(`${this.endpoint}/${id}`, {
            method: 'DELETE',
        });
        return res;
    }
    async loadAll() {
        const res = await fetch(this.endpoint);
        return res.json();
    }
    async loadOne(id) {
        const res = await fetch(`${this.endpoint}/${id}`);
        return res.json();
    }
}
