import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

export type CategoriaPreEntreno = 'Estimulante' | 'Moderado' | 'Sin estimulantes';
export type FiltroPreEntreno = 'Todos' | CategoriaPreEntreno;

export interface PreEntreno {
  id: number;
  nombre: string;
  categoria: CategoriaPreEntreno;
  descripcion: string;
  cafeinaMg: number; // mg de cafeína por toma (0 = sin cafeína)
  presentacion: string;
  tomas: number;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-pre-entrenos',
  styleUrl: './pre-entrenos.css',
  templateUrl: './pre-entrenos.html',
})
export class PreEntrenos {
  private readonly carrito = inject(CarritoService);

  readonly filtros: FiltroPreEntreno[] = ['Todos', 'Estimulante', 'Moderado', 'Sin estimulantes'];

  private readonly productos = signal<PreEntreno[]>([
    {
      id: 1,
      nombre: 'Pre-entreno Energy',
      categoria: 'Estimulante',
      descripcion: 'Fórmula intensa con cafeína para entrenamientos exigentes.',
      cafeinaMg: 300,
      presentacion: '300 g',
      tomas: 30,
      precio: 119900,
      imagen: 'assets/img/pre-energy.png',
      alt: 'Bote de pre-entreno Energy',
      etiqueta: 'Más vendido',
    },
    {
      id: 2,
      nombre: 'Pre-entreno Focus',
      categoria: 'Moderado',
      descripcion: 'Energía y concentración con una dosis de cafeína media.',
      cafeinaMg: 150,
      presentacion: '270 g',
      tomas: 30,
      precio: 109900,
      imagen: 'assets/img/pre-focus.png',
      alt: 'Bote de pre-entreno Focus',
    },
    {
      id: 3,
      nombre: 'Pre-entreno Stim-Free',
      categoria: 'Sin estimulantes',
      descripcion: 'Sin cafeína, para entrenar de noche o si eres sensible a los estimulantes.',
      cafeinaMg: 0,
      presentacion: '360 g',
      tomas: 30,
      precio: 114900,
      imagen: 'assets/img/pre-stim-free.png',
      alt: 'Bote de pre-entreno sin estimulantes',
      etiqueta: 'Sin cafeína',
    },
    {
      id: 4,
      nombre: 'Pump Citrulina',
      categoria: 'Sin estimulantes',
      descripcion: 'Citrulina y beta-alanina en una mezcla sin cafeína.',
      cafeinaMg: 0,
      presentacion: '300 g',
      tomas: 25,
      precio: 99900,
      imagen: 'assets/img/pre-pump.png',
      alt: 'Bote de pump con citrulina',
    },
  ]);

  readonly filtroActivo = signal<FiltroPreEntreno>('Todos');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todos'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  seleccionarFiltro(filtro: FiltroPreEntreno): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: PreEntreno): void {
    this.carrito.agregar({
      id: 'pre-entrenos-' + producto.id,
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