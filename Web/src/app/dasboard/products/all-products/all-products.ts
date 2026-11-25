import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductoBaseDatos, Productos } from '../../../Services/productos/productos';
import { Auth } from '../../../Services/auth/auth';
import { CatalogoService } from '../../../Services/catalogo.service/catalogo.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-products.html',
  styleUrls: ['./all-products.css']
})
export class AllProducts implements OnInit {
  private productosService = inject(Productos);
  private authService = inject(Auth);
  private catalogoService = inject(CatalogoService);
  private changeDetector = inject(ChangeDetectorRef);

  productos: ProductoBaseDatos[] = [];
  readonly categorias: ProductoBaseDatos['categoria'][] = [
    'Proteina',
    'creatina',
    'pre-entrenos',
    'accesorios',
  ];
  categoriaSeleccionada: ProductoBaseDatos['categoria'] | 'Todas' = 'Todas';
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarProductos();
  }

  get esAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get productosFiltrados(): ProductoBaseDatos[] {
    return this.categoriaSeleccionada === 'Todas'
      ? this.productos
      : this.productos.filter((producto) => producto.categoria === this.categoriaSeleccionada);
  }

  cargarProductos(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.productosService.getProductos().pipe(
      finalize(() => this.changeDetector.markForCheck()),
    ).subscribe({
      next: (response: unknown) => {
        const productos = this.extraerProductos(response);
        if (!productos) {
          this.errorMensaje = 'El servidor no devolvió una lista de productos válida.';
          this.productos = [];
          this.cargando = false;
          return;
        }

        this.productos = productos;
        this.cargando = false;
      },
      error: (err) => {
        if (err.name === 'TimeoutError') {
          this.errorMensaje = 'La API de productos no respondió en 15 segundos.';
        } else if (err.status === 0) {
          this.errorMensaje = 'No se pudo conectar con http://localhost:3000/productos.';
        } else if (err.status === 401 || err.status === 403) {
          this.errorMensaje = 'No tienes permiso para consultar los productos. Inicia sesión como administrador.';
        } else {
          this.errorMensaje =
            err.error?.mensaje ||
            err.error?.message ||
            `No se pudieron cargar los productos (HTTP ${err.status}).`;
        }
        this.cargando = false;
      }
    });
  }

  private extraerProductos(response: unknown): ProductoBaseDatos[] | null {
    const data = this.buscarLista(response);
    if (!Array.isArray(data)) return null;

    const productos: ProductoBaseDatos[] = [];
    for (const item of data) {
      if (!this.esRegistro(item)) return null;
      const {
        nombre,
        descripcion,
        imagenes,
        precio,
        cantidad,
        categoria,
        disponible,
        sku,
      } = item;
      const id = item['_id'] ?? item['id'];
      const precioNumero = typeof precio === 'number' ? precio : Number(precio);
      const cantidadNumero = typeof cantidad === 'number' ? cantidad : Number(cantidad ?? 0);
      const imagenesNormalizadas = Array.isArray(imagenes)
        ? imagenes.filter((imagen): imagen is string => typeof imagen === 'string')
        : [];
      if (
        typeof id !== 'string' ||
        typeof nombre !== 'string' ||
        typeof descripcion !== 'string' ||
        !Number.isFinite(precioNumero) ||
        !Number.isFinite(cantidadNumero) ||
        (categoria !== 'Proteina' &&
          categoria !== 'creatina' &&
          categoria !== 'pre-entrenos' &&
          categoria !== 'accesorios') ||
        (disponible !== undefined && typeof disponible !== 'boolean') ||
        (sku !== undefined && typeof sku !== 'string')
      ) {
        return null;
      }

      productos.push({
        _id: id,
        nombre,
        descripcion,
        imagenes: imagenesNormalizadas,
        precio: precioNumero,
        cantidad: cantidadNumero,
        categoria,
        disponible: disponible !== false,
        ...(typeof sku === 'string' ? { sku } : {}),
      });
    }

    return productos;
  }

  private buscarLista(value: unknown, profundidad = 0): unknown[] | null {
    if (Array.isArray(value)) return value;
    if (!this.esRegistro(value) || profundidad >= 3) return null;

    for (const key of ['datos', 'productos', 'data', 'results', 'resultados']) {
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

  eliminarProducto(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    this.productosService.eliminarProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter((producto) => producto._id !== id);
        this.catalogoService.recargar();
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        alert('Error al eliminar el producto.');
      }
    });
  }
}