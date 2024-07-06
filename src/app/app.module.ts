import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductoComponent,
    ContactoComponent,
  ],
  imports: [BrowserModule,AppRoutingModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class ProductoModule { }
