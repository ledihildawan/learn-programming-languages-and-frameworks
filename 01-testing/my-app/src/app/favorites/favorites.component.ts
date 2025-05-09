import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites.service';
import { favoritesFactory } from './favorites';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [
    { provide: ProductsService, useFactory: favoritesFactory(true) }
  ]
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly productService: ProductsService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
