import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../product-list/product.service';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService, AuthService]
})
export class CreateProductComponent implements OnInit {

  createForm: FormGroup;

  formErrors = {
    name: '',
    price: '',
    description: ''

  };

  validationMessages = {
    name: {
      required: 'Field name can not be empty',
      minlength: 'Minimum 2 letters'
    },
    price: {
      required: 'Field price can not be empty'
    },
    description: {
      required: 'Field description can not be empty'
    }
  };

  constructor(private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder,
  private router: Router) {
  }

  ngOnInit() {

    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.createForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.createForm.get(field);
      if (control.dirty) {
        for (const key in control.errors) {
          this.formErrors[field] = this.validationMessages[field][key];
        }
      }
    }
  }

  createProduct(createForm: FormGroup) {
    this.productService.createNewProduct(createForm.value.name, createForm.value.price, createForm.value.description, localStorage.getItem('currentUser'));
  }

  logOut() {
    this.authService.deleteToken();
    localStorage.removeItem('currentUser');
    this.router.navigate(['products']);
  }
}
