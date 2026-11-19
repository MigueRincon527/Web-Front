import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';
import { CatalogoService, ProductoCatalogo } from '../../Services/catalogo.service/catalogo.service';

@Component({
  imports: [RouterLink],
  selector: 'app-proteinas',
  styleUrl: './proteinas.css',
  templateUrl: './proteinas.html',
})
export class Proteinas {
  private readonly carrito = inject(CarritoService);
  private readonly catalogo = inject(CatalogoService);

  readonly filtros: string[] = ['Todas', 'Whey', 'Aislada', 'Caseína', 'Vegetal'];

  private readonly productos = this.catalogo.porSeccion('proteinas');

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