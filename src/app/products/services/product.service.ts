import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = environment.baseUrl + 'product';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  public getOne(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + '/' + id);
  }

  public add(product: Product) {
    return this.httpClient.post(this.productUrl, product, httpOptions);
  }

  public update(product: Product) {
    return this.httpClient.put(this.productUrl, product, httpOptions);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.productUrl + '/' + id);
  }
}
