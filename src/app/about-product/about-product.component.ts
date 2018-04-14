import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';
import { ProductService } from '../product-list/product.service';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css'],
  providers: [ProductService]
})
export class AboutProductComponent implements OnInit {

  private activeItem;
  private id: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProductById(this.id)
        .map((data: Response) => data.json())
        .subscribe(data => {
          this.activeItem = data;
        });
    });
  }

}
