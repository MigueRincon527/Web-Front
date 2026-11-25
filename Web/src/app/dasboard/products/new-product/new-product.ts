import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NuevoProducto, ProductoBaseDatos, Productos } from '../../../Services/productos/productos';
import { CatalogoService } from '../../../Services/catalogo.service/catalogo.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.css']
})
export class NewProduct {
  private productosService = inject(Productos);
  private catalogoService = inject(CatalogoService);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  categorias: ProductoBaseDatos['categoria'][] = ['Proteina', 'creatina', 'pre-entrenos', 'accesorios'];

  nombre: string = '';
  descripcion: string = '';
  imagenesTexto: string = '';
  precio: number | null = null;
  cantidad: number | null = null;
  categoria: ProductoBaseDatos['categoria'] | '' = '';
  sku: string = '';
  disponible: boolean = true;

  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  validarFormulario(): boolean {
    this.errorMensaje = '';

    if (
      !this.nombre.trim() ||
      !this.descripcion.trim() ||
      !this.categoria ||
      !this.categorias.includes(this.categoria)
    ) {
      this.errorMensaje = 'Completa todos los campos obligatorios.';
      return false;
    }

    if (this.precio === null || !Number.isFinite(this.precio) || this.precio < 0) {
      this.errorMensaje = 'Ingresa un precio válido.';
      return false;
    }

    if (this.cantidad === null || !Number.isFinite(this.cantidad) || this.cantidad < 0) {
      this.errorMensaje = 'Ingresa una cantidad válida.';
      return false;
    }

    return true;
  }

  crearProducto(): void {
    if (!this.validarFormulario()) return;
    const categoria = this.categorias.find((opcion) => opcion === this.categoria);
    if (!categoria) {
      this.errorMensaje = 'Selecciona una categoría válida.';
      return;
    }
    const precio = this.precio;
    const cantidad = this.cantidad;
    if (precio === null || cantidad === null) {
      this.errorMensaje = 'Ingresa un precio y una cantidad válidos.';
      return;
    }

    this.guardando = true;
    this.errorMensaje = '';

    const nuevoProducto: NuevoProducto = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      imagenes: this.imagenesTexto
        .split('\n')
        .map((imagen) => imagen.trim())
        .filter((imagen) => imagen.length > 0),
      precio,
      cantidad,
      categoria,
      disponible: this.disponible,
      ...(this.sku.trim() ? { sku: this.sku.trim() } : {}),
    };

    this.productosService.crearProducto(nuevoProducto).pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoMensaje = `¡${this.nombre.trim()} ha sido registrado con éxito!`;
        this.catalogoService.recargar();
        setTimeout(() => this.router.navigate(['/dashboard/productos']), 2200);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMensaje =
          err.error?.mensaje || err.error?.message || 'Error al registrar el producto.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/productos']);
  }
}