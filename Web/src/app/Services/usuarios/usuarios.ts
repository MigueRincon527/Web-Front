import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Usuarios {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}/api/usuarios`);
  }

  getUsuarioPorId(id: string) {
    return this.http.get<any>(`${this.apiUrl}/api/usuarios/${id}`);
  }

  actualizarUsuario(id: string, usuario: unknown) {
    return this.http.put(`${this.apiUrl}/api/usuarios/${id}`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.apiUrl}/api/usuarios/${id}`);
  }
}
