import { Component, input, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-view',
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
  id = input<number>();

  product: Product | undefined;

  constructor(private readonly productService: ProductsService) {}

  ngOnInit() {
    this.product = this.getProduct(this.id()!);
  }

  getProduct(id: number) {
    const products = this.productService.getProducts();

    if (!this.product) {
      this.product = products.find(product => product.id === id);
    }

    return this.product;
  }
}
