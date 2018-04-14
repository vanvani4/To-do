import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { ProductService } from './product-list/product.service';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';

const appRoutes: Routes = [
  {path: 'products', component: ProductListComponent, pathMatch: 'full'},
  {path: 'product/new', component: CreateProductComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'product/:id', component: AboutProductComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AboutProductComponent,
    CreateProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
