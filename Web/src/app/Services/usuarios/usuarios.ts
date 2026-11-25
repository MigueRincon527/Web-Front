import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: string;
}

export type RolUsuario = 'usuario' | 'admin';

export interface UsuarioEditable {
  nombre: string;
  email: string;
  rol: RolUsuario;
}

@Injectable({ providedIn: 'root' })
export class Usuarios {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getUsuarios(): Observable<unknown> {
    return this.http.get<unknown>(`${this.apiUrl}/usuarios`);
  }

  getUsuarioPorId(id: string) {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  actualizarUsuario(id: string, usuario: UsuarioEditable): Observable<unknown> {
    return this.http.put<unknown>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}
