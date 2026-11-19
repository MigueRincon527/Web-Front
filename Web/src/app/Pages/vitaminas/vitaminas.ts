import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

export type CategoriaVitamina = 'Multivitamínicos' | 'Omega 3' | 'Vitamina D' | 'Minerales';
export type FiltroVitamina = 'Todas' | CategoriaVitamina;

export interface Vitamina {
  id: number;
  nombre: string;
  categoria: CategoriaVitamina;
  descripcion: string;
  aporte: string; // aporte principal por porción
  presentacion: string;
  porciones: number;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-vitaminas',
  styleUrl: './vitaminas.css',
  templateUrl: './vitaminas.html',
})
export class Vitaminas {
  private readonly carrito = inject(CarritoService);

  readonly filtros: FiltroVitamina[] = ['Todas', 'Multivitamínicos', 'Omega 3', 'Vitamina D', 'Minerales'];

  private readonly productos = signal<Vitamina[]>([
    {
      id: 1,
      nombre: 'Multivitamínico diario',
      categoria: 'Multivitamínicos',
      descripcion: 'Combinación de vitaminas y minerales para complementar tu alimentación.',
      aporte: 'Vitaminas y minerales esenciales',
      presentacion: '120 tabletas',
      porciones: 60,
      precio: 74900,
      imagen: 'assets/img/multivitaminico.png',
      alt: 'Bote de multivitamínico diario',
      etiqueta: 'Más vendida',
    },
    {
      id: 2,
      nombre: 'Omega 3',
      categoria: 'Omega 3',
      descripcion: 'Aceite de pescado en cápsulas blandas, sin sabor a pescado.',
      aporte: '1.000 mg de omega 3 por porción',
      presentacion: '90 cápsulas',
      porciones: 45,
      precio: 69900,
      imagen: 'assets/img/omega-3.png',
      alt: 'Bote de omega 3',
    },
    {
      id: 3,
      nombre: 'Vitamina D3',
      categoria: 'Vitamina D',
      descripcion: 'Una cápsula al día. Útil si tomas poco sol.',
      aporte: '2.000 UI por cápsula',
      presentacion: '120 cápsulas',
      porciones: 120,
      precio: 44900,
      imagen: 'assets/img/vitamina-d3.png',
      alt: 'Bote de vitamina D3',
    },
    {
      id: 4,
      nombre: 'Magnesio',
      categoria: 'Minerales',
      descripcion: 'Mineral para el funcionamiento muscular y el descanso.',
      aporte: '400 mg de magnesio por porción',
      presentacion: '120 cápsulas',
      porciones: 60,
      precio: 54900,
      imagen: 'assets/img/magnesio.png',
      alt: 'Bote de magnesio',
      etiqueta: 'Nuevo',
    },
  ]);

  readonly filtroActivo = signal<FiltroVitamina>('Todas');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todas'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  seleccionarFiltro(filtro: FiltroVitamina): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: Vitamina): void {
    this.carrito.agregar({
      id: 'vitaminas-' + producto.id,
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