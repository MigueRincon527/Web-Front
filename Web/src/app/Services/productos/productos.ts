import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

export interface ProductoBaseDatos {
  _id: string;
  nombre: string;
  descripcion: string;
  imagenes: string[];
  precio: number;
  cantidad: number;
  categoria: 'Proteina' | 'creatina' | 'pre-entrenos' | 'accesorios';
  disponible: boolean;
  sku?: string;
}

export type NuevoProducto = Omit<ProductoBaseDatos, '_id'>;

@Injectable({ providedIn: 'root' })
export class Productos {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getProductos(): Observable<unknown> {
    return this.http.get<unknown>(`${this.apiUrl}/productos`).pipe(timeout({ first: 15000 }));
  }

  getProductoPorId(id: string): Observable<unknown> {
    return this.http.get<unknown>(`${this.apiUrl}/productos/${id}`);
  }

  crearProducto(producto: NuevoProducto) {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  actualizarProducto(id: string, producto: NuevoProducto): Observable<unknown> {
    return this.http.put<unknown>(`${this.apiUrl}/productos/${id}`, producto);
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }
}
