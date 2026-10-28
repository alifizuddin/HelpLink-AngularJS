import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MarketProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  seller?: string;
  sellerIcon?: string;
  badge?: string;
  impact?: string;
  impactType?: 'income' | 'training';
  stock?: string;
  id?: string;
  createdAt?: string;
  status?: string;
}

export interface Purchase {
  productId: string;
  productName: string;
  price: number;
  buyerInfo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private baseUrl = 'http://localhost:3000/api/market';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<MarketProduct[]> {
    return this.http.get<MarketProduct[]>(`${this.baseUrl}/products`);
  }

  addProduct(product: MarketProduct): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  purchaseProduct(purchase: Purchase): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchase`, purchase);
  }

  getPurchases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases`);
  }
}
