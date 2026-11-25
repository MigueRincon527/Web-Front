import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { RolUsuario, UsuarioEditable, Usuarios } from '../../../Services/usuarios/usuarios';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css']
})
export class UpdateUser implements OnInit {
  private usuariosService = inject(Usuarios);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  usuarioId: string = '';
  nombre: string = '';
  email: string = '';
  rol: RolUsuario = 'usuario';

  cargando: boolean = true;
  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.usuarioId) {
      this.errorMensaje = 'No se especificó un usuario para editar.';
      this.cargando = false;
      return;
    }

    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuariosService.getUsuarioPorId(this.usuarioId).pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: (response: unknown) => {
        const usuario = this.extraerUsuario(response);
        if (
          !usuario ||
          typeof usuario['nombre'] !== 'string' ||
          typeof usuario['email'] !== 'string' ||
          (usuario['rol'] !== 'usuario' && usuario['rol'] !== 'admin')
        ) {
          this.errorMensaje = 'La API no devolvió los datos esperados del usuario.';
          this.cargando = false;
          return;
        }

        this.nombre = usuario['nombre'];
        this.email = usuario['email'];
        this.rol = usuario['rol'];
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje =
          err.error?.mensaje ||
          err.error?.message ||
          `No se pudo cargar el usuario (HTTP ${err.status}).`;
        this.cargando = false;
      }
    });
  }

  guardarCambios(): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';
    if (
      !this.usuarioId ||
      !this.nombre.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim()) ||
      (this.rol !== 'usuario' && this.rol !== 'admin')
    ) {
      this.errorMensaje = 'Revisa el nombre, el correo y el rol antes de guardar.';
      return;
    }

    this.guardando = true;

    const datosActualizados: UsuarioEditable = {
      nombre: this.nombre.trim(),
      email: this.email.trim().toLowerCase(),
      rol: this.rol
    };

    this.usuariosService.actualizarUsuario(this.usuarioId, datosActualizados).pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: (response: unknown) => {
        this.guardando = false;
        const usuarioActualizado = this.extraerUsuario(response);
        if (
          !usuarioActualizado ||
          usuarioActualizado['nombre'] !== datosActualizados.nombre ||
          usuarioActualizado['email'] !== datosActualizados.email ||
          usuarioActualizado['rol'] !== datosActualizados.rol
        ) {
          this.errorMensaje = 'La API no confirmó que los cambios se guardaran.';
          return;
        }

        this.exitoMensaje = 'Usuario actualizado correctamente. Los permisos del rol se actualizaron.';
        setTimeout(() => this.router.navigate(['/dashboard/usuarios']), 1200);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMensaje =
          err.error?.mensaje ||
          err.error?.message ||
          `Error al actualizar el usuario (HTTP ${err.status}).`;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }

  private extraerUsuario(response: unknown): Record<string, unknown> | null {
    if (!this.esRegistro(response)) return null;
    const data = response['datos'] ?? response['usuario'] ?? response;
    return this.esRegistro(data) ? data : null;
  }

  private esRegistro(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}