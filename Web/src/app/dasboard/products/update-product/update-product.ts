import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NuevoProducto, ProductoBaseDatos, Productos } from '../../../Services/productos/productos';
import { CatalogoService } from '../../../Services/catalogo.service/catalogo.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.html',
  styleUrls: ['./update-product.css']
})
export class UpdateProduct implements OnInit {
  private productosService = inject(Productos);
  private catalogoService = inject(CatalogoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  categorias: ProductoBaseDatos['categoria'][] = ['Proteina', 'creatina', 'pre-entrenos', 'accesorios'];

  productoId: string = '';
  nombre: string = '';
  descripcion: string = '';
  imagenesTexto: string = '';
  precio: number | null = null;
  cantidad: number | null = null;
  categoria: ProductoBaseDatos['categoria'] | '' = '';
  sku: string = '';
  disponible: boolean = true;

  cargando: boolean = true;
  productoCargado: boolean = false;
  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  ngOnInit(): void {
    this.productoId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.productoId) {
      this.errorMensaje = 'No se especificó un producto para editar.';
      this.cargando = false;
      return;
    }

    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productosService.getProductoPorId(this.productoId).pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: (response: unknown) => {
        const p = this.extraerProducto(response);
        if (
          !p ||
          typeof p['nombre'] !== 'string' ||
          typeof p['descripcion'] !== 'string' ||
          typeof p['precio'] !== 'number' ||
          typeof p['cantidad'] !== 'number' ||
          typeof p['categoria'] !== 'string'
        ) {
          this.errorMensaje = 'El servidor no devolvió un producto válido.';
          this.cargando = false;
          return;
        }

        this.nombre = p['nombre'];
        this.descripcion = p['descripcion'];
        this.imagenesTexto = Array.isArray(p['imagenes'])
          ? p['imagenes'].filter((imagen: unknown) => typeof imagen === 'string').join('\n')
          : '';
        this.precio = p['precio'];
        this.cantidad = p['cantidad'];
        const categoria = this.categorias.find((opcion) => opcion === p['categoria']);
        if (!categoria) {
          this.errorMensaje = 'El producto tiene una categoría no válida.';
          this.cargando = false;
          return;
        }
        this.categoria = categoria;
        this.sku = typeof p['sku'] === 'string' ? p['sku'] : '';
        this.disponible = p['disponible'] !== false;
        this.productoCargado = true;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar el producto.';
        this.cargando = false;
      }
    });
  }

  guardarCambios(): void {
    if (this.guardando) return;

    this.errorMensaje = '';
    this.exitoMensaje = '';
    if (
      !this.nombre.trim() ||
      !this.descripcion.trim() ||
      !this.categoria ||
      !this.categorias.includes(this.categoria) ||
      this.precio === null ||
      !Number.isFinite(this.precio) ||
      this.precio < 0 ||
      this.cantidad === null ||
      !Number.isFinite(this.cantidad) ||
      this.cantidad < 0
    ) {
      this.errorMensaje = 'Completa los campos obligatorios con valores válidos.';
      return;
    }

    const precio = this.precio;
    const cantidad = this.cantidad;
    const categoria = this.categorias.find((opcion) => opcion === this.categoria);
    if (precio === null || cantidad === null || !categoria) {
      this.errorMensaje = 'Completa los campos obligatorios con valores válidos.';
      return;
    }

    this.guardando = true;

    const datosActualizados: NuevoProducto = {
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
      sku: this.sku.trim()
    };

    this.productosService.actualizarProducto(this.productoId, datosActualizados).pipe(
      finalize(() => {
        this.guardando = false;
        this.changeDetector.markForCheck();
      }),
    ).subscribe({
      next: () => {
        this.exitoMensaje = 'Producto actualizado correctamente.';
        this.catalogoService.recargar();
        setTimeout(() => this.router.navigate(['/dashboard/productos']), 1200);
      },
      error: (err) => {
        this.errorMensaje = err.error?.mensaje || err.error?.message || 'Error al actualizar el producto.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/productos']);
  }

  private extraerProducto(response: unknown): Record<string, unknown> | null {
    if (!this.esRegistro(response)) return null;
    const data = response['datos'] ?? response['producto'] ?? response;
    return this.esRegistro(data) ? data : null;
  }

  private esRegistro(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}