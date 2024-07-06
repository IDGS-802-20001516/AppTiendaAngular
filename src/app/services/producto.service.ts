import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';
import { IProducto } from '../interfaces/producto';

@Injectable({
 providedIn: 'root'
})
export class ProductoService {
 private endpoint: string = environment.endPoint;
 private apiUrl: string = this.endpoint + "Producto/";
 constructor(private http: HttpClient) { }
 //Método para invocar al endpoint de ListaTareas
 getList(): Observable<IProducto[]>{
 return this.http.get<IProducto[]>(`${this.apiUrl}ListaProductos`);
 }



search(keyword: string): Observable<IProducto[]> {
  if (!keyword.trim()) {
    return this.getList(); 
  }
  return this.http.get<IProducto[]>(`${this.apiUrl}BuscarProductos/${keyword}`).pipe(
    catchError(this.handleError<IProducto[]>('search', []))
  );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

// Método para invocar al endpoint de ListaProductosPorCategoria
ppc(idCategoria: number): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.apiUrl}ListaProductosPorCategoria/${idCategoria}`);
  }

}
