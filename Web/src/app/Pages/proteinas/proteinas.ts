import { Component, computed, output, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

export type CategoriaProteina = 'Whey' | 'Aislada' | 'Caseína' | 'Vegetal';
export type Filtro = 'Todas' | CategoriaProteina;

export interface Proteina {
  id: number;
  nombre: string;
  categoria: CategoriaProteina;
  descripcion: string;
  proteinaPorToma: number; // gramos
  presentacion: string;
  tomas: number;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-proteinas',
  styleUrl: './proteinas.css',
  templateUrl: './proteinas.html',
})
export class Proteinas {
  readonly filtros: Filtro[] = ['Todas', 'Whey', 'Aislada', 'Caseína', 'Vegetal'];

  private readonly productos = signal<Proteina[]>([
    {
      id: 1,
      nombre: 'Whey Protein',
      categoria: 'Whey',
      descripcion: 'Absorción rápida, ideal después de entrenar.',
      proteinaPorToma: 24,
      presentacion: '1 kg',
      tomas: 33,
      precio: 129900,
      imagen: 'assets/img/whey-chocolate.png',
      alt: 'Bote de Whey Protein sabor chocolate',
      etiqueta: 'Más vendida',
    },
    {
      id: 2,
      nombre: 'Whey Isolate',
      categoria: 'Aislada',
      descripcion: 'Muy baja en grasa y lactosa. Perfecta para definición.',
      proteinaPorToma: 27,
      presentacion: '900 g',
      tomas: 30,
      precio: 169900,
      imagen: 'assets/img/isolate-vainilla.png',
      alt: 'Bote de proteína aislada sabor vainilla',
    },
    {
      id: 3,
      nombre: 'Caseína',
      categoria: 'Caseína',
      descripcion: 'Digestión lenta, recomendada antes de dormir.',
      proteinaPorToma: 24,
      presentacion: '900 g',
      tomas: 28,
      precio: 149900,
      imagen: 'assets/img/caseina-fresa.png',
      alt: 'Bote de caseína sabor fresa',
    },
    {
      id: 4,
      nombre: 'Proteína vegetal',
      categoria: 'Vegetal',
      descripcion: 'Mezcla de guisante y arroz. Apta para veganos.',
      proteinaPorToma: 22,
      presentacion: '800 g',
      tomas: 26,
      precio: 139900,
      imagen: 'assets/img/vegetal-cacao.png',
      alt: 'Bote de proteína vegetal sabor cacao',
      etiqueta: 'Sin lactosa',
    },
  ]);

  readonly filtroActivo = signal<Filtro>('Todas');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todas'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  /** Se emite al pulsar "Añadir"; el padre (o un servicio de carrito) lo recibe. */
  readonly agregar = output<Proteina>();

  seleccionarFiltro(filtro: Filtro): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: Proteina): void {
    this.agregar.emit(producto);
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}