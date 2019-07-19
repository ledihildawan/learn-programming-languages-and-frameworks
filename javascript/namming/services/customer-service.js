import { Customer } from '../models/customer';

export class CustomerService {
  constructor() {
    this.CUSTOMERS_ENDPOINT = 'mytestapi.com/v1/customers';
  }

  getAll() {
    return fetch(this.CUSTOMERS_ENDPOINT).then(data => data.json());
  }

  get(id) {
    return fetch(`${this.CUSTOMERS_ENDPOINT}/${id}`).then(data => data.json());
  }

  add(newCustomer) {
    if (this.validateCustomer(newCustomer)) {
      return fetch(this.CUSTOMERS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        credentials: 'inlcude',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}