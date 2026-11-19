import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';
import { CatalogoService, ProductoCatalogo } from '../../Services/catalogo.service/catalogo.service';

@Component({
  imports: [RouterLink],
  selector: 'app-vitaminas',
  styleUrl: './vitaminas.css',
  templateUrl: './vitaminas.html',
})
export class Vitaminas {
  private readonly carrito = inject(CarritoService);
  private readonly catalogo = inject(CatalogoService);

  readonly filtros: string[] = ['Todas', 'Multivitamínicos', 'Omega 3', 'Vitamina D', 'Minerales'];

  private readonly productos = this.catalogo.porSeccion('vitaminas');

  readonly filtroActivo = signal<string>(this.filtros[0]);

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === this.filtros[0]
      ? this.productos
      : this.productos.filter((p) => p.categoria === filtro);
  });

  seleccionarFiltro(filtro: string): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: ProductoCatalogo): void {
    this.carrito.agregar({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}