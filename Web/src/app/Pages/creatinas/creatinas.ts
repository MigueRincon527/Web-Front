import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

export type CategoriaCreatina = 'Monohidrato' | 'Micronizada' | 'HCl' | 'Cápsulas';
export type FiltroCreatina = 'Todas' | CategoriaCreatina;

export interface Creatina {
  id: number;
  nombre: string;
  categoria: CategoriaCreatina;
  descripcion: string;
  gramosPorToma: number; // gramos de creatina por toma
  presentacion: string;
  tomas: number;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-creatinas',
  styleUrl: './creatinas.css',
  templateUrl: './creatinas.html',
})
export class Creatinas {
  private readonly carrito = inject(CarritoService);

  readonly filtros: FiltroCreatina[] = ['Todas', 'Monohidrato', 'Micronizada', 'HCl', 'Cápsulas'];

  private readonly productos = signal<Creatina[]>([
    {
      id: 1,
      nombre: 'Creatina Monohidrato',
      categoria: 'Monohidrato',
      descripcion: 'La forma clásica y más estudiada. Sin sabor, se mezcla con cualquier bebida.',
      gramosPorToma: 5,
      presentacion: '300 g',
      tomas: 60,
      precio: 89900,
      imagen: 'assets/img/creatina-monohidrato.png',
      alt: 'Bote de creatina monohidrato',
      etiqueta: 'Más vendida',
    },
    {
      id: 2,
      nombre: 'Creatina Micronizada',
      categoria: 'Micronizada',
      descripcion: 'Partículas más finas que se disuelven mejor en agua.',
      gramosPorToma: 5,
      presentacion: '500 g',
      tomas: 100,
      precio: 129900,
      imagen: 'assets/img/creatina-micronizada.png',
      alt: 'Bote de creatina micronizada',
    },
    {
      id: 3,
      nombre: 'Creatina HCl',
      categoria: 'HCl',
      descripcion: 'Clorhidrato de creatina, muy soluble y con dosis más pequeñas.',
      gramosPorToma: 2,
      presentacion: '120 g',
      tomas: 60,
      precio: 109900,
      imagen: 'assets/img/creatina-hcl.png',
      alt: 'Bote de creatina HCl',
    },
    {
      id: 4,
      nombre: 'Creatina en cápsulas',
      categoria: 'Cápsulas',
      descripcion: 'Fácil de llevar y sin mezclar. Ideal para viajar.',
      gramosPorToma: 3,
      presentacion: '120 cápsulas',
      tomas: 30,
      precio: 99900,
      imagen: 'assets/img/creatina-capsulas.png',
      alt: 'Bote de creatina en cápsulas',
      etiqueta: 'Práctica',
    },
  ]);

  readonly filtroActivo = signal<FiltroCreatina>('Todas');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todas'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  seleccionarFiltro(filtro: FiltroCreatina): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: Creatina): void {
    this.carrito.agregar({
      id: 'creatinas-' + producto.id,
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