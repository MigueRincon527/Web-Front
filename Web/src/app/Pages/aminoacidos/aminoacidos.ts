import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

export type CategoriaAminoacido = 'BCAA' | 'EAA' | 'Glutamina' | 'Citrulina';
export type FiltroAminoacido = 'Todos' | CategoriaAminoacido;

export interface Aminoacido {
  id: number;
  nombre: string;
  categoria: CategoriaAminoacido;
  descripcion: string;
  gramosPorToma: number; // gramos de aminoácidos por toma
  presentacion: string;
  tomas: number;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-aminoacidos',
  styleUrl: './aminoacidos.css',
  templateUrl: './aminoacidos.html',
})
export class Aminoacidos {
  private readonly carrito = inject(CarritoService);

  readonly filtros: FiltroAminoacido[] = ['Todos', 'BCAA', 'EAA', 'Glutamina', 'Citrulina'];

  private readonly productos = signal<Aminoacido[]>([
    {
      id: 1,
      nombre: 'BCAA 2:1:1',
      categoria: 'BCAA',
      descripcion: 'Leucina, isoleucina y valina para tomar durante el entrenamiento.',
      gramosPorToma: 7,
      presentacion: '300 g',
      tomas: 40,
      precio: 89900,
      imagen: 'assets/img/bcaa.png',
      alt: 'Bote de BCAA 2:1:1',
      etiqueta: 'Más vendido',
    },
    {
      id: 2,
      nombre: 'EAA esenciales',
      categoria: 'EAA',
      descripcion: 'Los nueve aminoácidos esenciales en una sola mezcla.',
      gramosPorToma: 10,
      presentacion: '400 g',
      tomas: 40,
      precio: 119900,
      imagen: 'assets/img/eaa.png',
      alt: 'Bote de aminoácidos esenciales EAA',
    },
    {
      id: 3,
      nombre: 'Glutamina',
      categoria: 'Glutamina',
      descripcion: 'L-glutamina en polvo, sin sabor. Se mezcla con cualquier bebida.',
      gramosPorToma: 5,
      presentacion: '300 g',
      tomas: 60,
      precio: 79900,
      imagen: 'assets/img/glutamina.png',
      alt: 'Bote de glutamina',
    },
    {
      id: 4,
      nombre: 'Citrulina malato',
      categoria: 'Citrulina',
      descripcion: 'Aminoácido muy usado antes de entrenar. Sin cafeína.',
      gramosPorToma: 6,
      presentacion: '240 g',
      tomas: 40,
      precio: 84900,
      imagen: 'assets/img/citrulina.png',
      alt: 'Bote de citrulina malato',
      etiqueta: 'Sin cafeína',
    },
  ]);

  readonly filtroActivo = signal<FiltroAminoacido>('Todos');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todos'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  seleccionarFiltro(filtro: FiltroAminoacido): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: Aminoacido): void {
    this.carrito.agregar({
      id: 'aminoacidos-' + producto.id,
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