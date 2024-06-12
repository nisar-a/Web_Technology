import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}