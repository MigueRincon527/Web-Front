import { Component, computed, output, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

export type CategoriaAccesorio = 'Shakers' | 'Cinturones' | 'Agarre';
export type FiltroAccesorio = 'Todos' | CategoriaAccesorio;

export interface Accesorio {
  id: number;
  nombre: string;
  categoria: CategoriaAccesorio;
  descripcion: string;
  medida: string; // capacidad o tallas disponibles
  material: string;
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-accesorios',
  styleUrl: './accesorios.css',
  templateUrl: './accesorios.html',
})
export class Accesorios {
  readonly filtros: FiltroAccesorio[] = ['Todos', 'Shakers', 'Cinturones', 'Agarre'];

  private readonly productos = signal<Accesorio[]>([
    {
      id: 1,
      nombre: 'Shaker 700 ml',
      categoria: 'Shakers',
      descripcion: 'Tapa antiderrame y bola mezcladora para batir sin grumos.',
      medida: '700 ml',
      material: 'Plástico libre de BPA',
      precio: 24900,
      imagen: 'assets/img/shaker-700.png',
      alt: 'Shaker de 700 ml',
      etiqueta: 'Más vendido',
    },
    {
      id: 2,
      nombre: 'Shaker con compartimentos',
      categoria: 'Shakers',
      descripcion: 'Lleva tu proteína y tus cápsulas en un solo envase.',
      medida: '600 ml',
      material: 'Plástico libre de BPA',
      precio: 29900,
      imagen: 'assets/img/shaker-compartimentos.png',
      alt: 'Shaker con compartimentos para polvo y cápsulas',
    },
    {
      id: 3,
      nombre: 'Cinturón de levantamiento',
      categoria: 'Cinturones',
      descripcion: 'Soporte firme para sentadilla y peso muerto con cierre ajustable.',
      medida: 'Tallas S a XL',
      material: 'Cuero sintético',
      precio: 119900,
      imagen: 'assets/img/cinturon.png',
      alt: 'Cinturón de levantamiento de pesas',
    },
    {
      id: 4,
      nombre: 'Straps de agarre',
      categoria: 'Agarre',
      descripcion: 'Para que el agarre no limite tus series de jalón y peso muerto.',
      medida: 'Talla única',
      material: 'Algodón reforzado',
      precio: 34900,
      imagen: 'assets/img/straps.png',
      alt: 'Par de straps de agarre',
      etiqueta: 'Nuevo',
    },
    {
      id: 5,
      nombre: 'Guantes de entrenamiento',
      categoria: 'Agarre',
      descripcion: 'Acolchado en la palma y malla transpirable en el dorso.',
      medida: 'Tallas S a XL',
      material: 'Neopreno y malla',
      precio: 44900,
      imagen: 'assets/img/guantes.png',
      alt: 'Guantes de entrenamiento',
    },
  ]);

  readonly filtroActivo = signal<FiltroAccesorio>('Todos');

  readonly productosFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    return filtro === 'Todos'
      ? this.productos()
      : this.productos().filter((p) => p.categoria === filtro);
  });

  /** Se emite al pulsar "Añadir"; el padre (o un servicio de carrito) lo recibe. */
  readonly agregar = output<Accesorio>();

  seleccionarFiltro(filtro: FiltroAccesorio): void {
    this.filtroActivo.set(filtro);
  }

  agregarAlCarrito(producto: Accesorio): void {
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