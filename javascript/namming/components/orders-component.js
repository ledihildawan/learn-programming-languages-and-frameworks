import { Order } from '../../models/order';
import { Item } from '../../models/item';
import { Customer } from '../../models/customer';
import { OrderService } from '../../models/order-service';
import { ItemsService } from '../../models/item-service';
import { CustomerService } from '../../models/customer-service';

export class OrdersComponent {
  constructor() {
    this.ordersService = new OrderService();
    this.itemsService = new ItemsService();
    this.customerService = new CustomerService();
  }

  add(customerId, itemId) {
    this.customerService.get(customerId).then(customer => {
      
    });
  }
}