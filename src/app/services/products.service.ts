import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "app/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class ProductsDataService extends CachingServiceBase {
  private products: Observable<Product[]>;

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.http.get<Product[]>("api/product")
  }

  public saveProduct(productId: any, quantity: number): Observable<any> {
    const requestBody = {
      quantity: quantity
    }
    return this.http.post(`api/product/${productId}`, requestBody);
  }

  public createProduct(formValue: any): Observable<any> {
    return this.http.post('api/product', formValue);
  }

  public removeProduct(productId: any): Observable<any> {
    return this.http.delete(`api/product/${productId}`);
  }
}
