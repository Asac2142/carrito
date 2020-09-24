import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

const appRoute: Routes = [
  {path: '', component: ProductosComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'ordenes', component: OrdenesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CarritoComponent,
    NavbarComponent,
    OrdenesComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
