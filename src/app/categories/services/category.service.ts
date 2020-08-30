import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = environment.baseUrl + 'category';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }

  public getOne(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.categoryUrl + '/' + id);
  }

  public add(category: Category) {
    return this.httpClient.post(this.categoryUrl, category, httpOptions);
  }

  public update(category: Category) {
    return this.httpClient.put(this.categoryUrl, category, httpOptions);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.categoryUrl + '/' + id);
  }
}
