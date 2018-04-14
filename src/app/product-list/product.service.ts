import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';

let productListObs: Observable<any>;
let activeItem: Observable<any>;

@Injectable()
export class ProductService {


  constructor(private http: Http) {
    this.getAllproducts();
  }

  getAllproducts() {
    productListObs = this.http.get('http://localhost:3000/products');
  }

  getProductListObs() {
    return productListObs;
  }

  getProductById(id: string) {
    activeItem = this.http.put('http://localhost:3000/product/id', {id});
    return activeItem;
  }

  createNewProduct(name: string, price: number, description: string, createdBy: string) {
    const token = localStorage.getItem('jwtToken');
    this.http.put('http://localhost:3000/product/new', { name, price, description, createdBy, token })
      .map((data: Response) => data.json())
      .subscribe(data => {
        data = data;
      });
  }
}
