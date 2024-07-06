import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { IProducto } from '../interfaces/producto';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, HttpClientModule, FormsModule, ReactiveFormsModule, NgFor, NgIf, MatCardModule],
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
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
  palabraClave = new FormControl('');

  IDProductoActual: number = 0;

  constructor(private _productoService: ProductoService) {}

  ngOnInit() {
    this.palabraClave.valueChanges.pipe(
      startWith(''),
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap(value => this._productoService.search(value ||'')) 
    ).subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoaded = true;
      },
      error: (e) => { console.log(e); }
    });
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
