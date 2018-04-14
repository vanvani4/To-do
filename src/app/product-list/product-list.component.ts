import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  lastId: string;
  productList;

  constructor(private productService: ProductService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProductListObs()
      .map((data: Response) => data.json())
      .subscribe(data => {
        this.productList = data;
      });
  }

  goToAbout(item) {
    this.lastId = item._id;
    this.router.navigate(['product/' + item._id]);
  }

  goToCreateProduct() {
    this.router.navigate(['product/new']);
  }
}
