import { Injectable } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {}

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems(): Product[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }
}