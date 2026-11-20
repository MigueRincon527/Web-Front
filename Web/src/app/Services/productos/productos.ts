import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Productos {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getProductos() {
    return this.http.get<any>(`${this.apiUrl}/api/productos`);
  }

  getProductoPorId(id: string) {
    return this.http.get<any>(`${this.apiUrl}/api/productos/${id}`);
  }

  crearProducto(producto: unknown) {
    return this.http.post(`${this.apiUrl}/api/productos`, producto);
  }

  actualizarProducto(id: string, producto: unknown) {
    return this.http.put(`${this.apiUrl}/api/productos/${id}`, producto);
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${this.apiUrl}/api/productos/${id}`);
  }
}
