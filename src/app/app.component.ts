import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IProducto } from './interfaces/producto';
import { ProductoService } from './services/producto.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, RouterLink, HttpClientModule, FormsModule, NgFor, NgIf, MatCardModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
  
})
export class AppComponent {
  
  listaProductos: IProducto[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  idCategoria: number = 0;
  color: string = "";
  nombre: string = "";
  modelo: string = "";
  almacenamiento: number = 0;
  procesador: string = "";
  ram: number = 0;
  imagen: string = "";
  precio: number = 0;
  palabraClave: string = "";

  IDProductoActual: number = 0;

  constructor(private _productoService: ProductoService) {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getList().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoaded = true;
      },
      error: (e) => { console.log(e) }
    });
  }

  buscarProductos() {
    this._productoService.search(this.palabraClave).subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoaded = true;
      },
      error: (e) => { console.log(e) }
    });
  }

  ppc(idCategoria: number) {
    this._productoService.ppc(idCategoria).subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoaded = true;
      },
      error: (e) => { console.log(e) }
    });
  }
}
