import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Usuario, Usuarios } from '../../../Services/usuarios/usuarios';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-user.html',
  styleUrls: ['./all-user.css']
})
export class AllUser implements OnInit {
  private usuariosService = inject(Usuarios);
  private changeDetector = inject(ChangeDetectorRef);

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.usuariosService.getUsuarios().pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: (data: unknown) => {
        const usuarios = this.extraerUsuarios(data);
        if (!usuarios) {
          this.errorMensaje = 'El servidor no devolvió una lista de usuarios válida.';
          this.usuarios = [];
          this.cargando = false;
          return;
        }

        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: (error) => {
        if (error.status === 0) {
          this.errorMensaje = 'No se pudo conectar con la API de usuarios en http://localhost:3000.';
        } else if (error.status === 401) {
          this.errorMensaje = 'La sesión expiró. Inicia sesión nuevamente como administrador.';
        } else if (error.status === 403) {
          this.errorMensaje = 'Tu cuenta no tiene permisos para consultar los usuarios.';
        } else {
          this.errorMensaje =
            error.error?.mensaje ||
            error.error?.message ||
            `No se pudieron cargar los usuarios (HTTP ${error.status}).`;
        }
        this.cargando = false;
      }
    });
  }

  private extraerUsuarios(response: unknown): Usuario[] | null {
    const data = this.buscarLista(response);
    if (!Array.isArray(data)) return null;

    const usuarios: Usuario[] = [];
    for (const item of data) {
      if (!this.esRegistro(item)) return null;

      const id = item['_id'] ?? item['id'];
      const { nombre, email, rol } = item;
      if (
        typeof id !== 'string' ||
        typeof nombre !== 'string' ||
        typeof email !== 'string'
      ) {
        return null;
      }

      usuarios.push({
        _id: id,
        nombre,
        email,
        rol: typeof rol === 'string' ? rol : 'usuario',
      });
    }

    return usuarios;
  }

  private buscarLista(value: unknown, profundidad = 0): unknown[] | null {
    if (Array.isArray(value)) return value;
    if (!this.esRegistro(value) || profundidad >= 3) return null;

    for (const key of ['datos', 'usuarios', 'users', 'data', 'results', 'resultados']) {
      if (key in value) {
        const lista = this.buscarLista(value[key], profundidad + 1);
        if (lista) return lista;
      }
    }

    return null;
  }

  private esRegistro(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  eliminarUsuario(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmar) return;

    this.usuariosService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((usuario) => usuario._id !== id);
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        alert('Error al eliminar el usuario.');
      }
    });
  }
}