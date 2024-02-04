import { DataResource } from './../services/data-resource';

export interface IPizza {
  id: string;
  price: number;
  title: string;
  created: string;
  updated: string;
  toppings: string[];
  description: string;
  collectionId: string;
}

export const Pizza = new DataResource<any>('http://127.0.0.1:8090/api/collections/pizzas/records');
