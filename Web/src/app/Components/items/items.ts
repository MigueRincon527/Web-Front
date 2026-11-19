import { Component, inject, signal } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

export interface ItemDestacado {
  id: number;
  nombre: string;
  detalle: string;
  precio: number; // COP
  imagen: string;
  alt: string;
}

@Component({
  imports: [],
  selector: 'app-items',
  styleUrl: './items.css',
  templateUrl: './items.html',
})
export class Items {
  private readonly carrito = inject(CarritoService);

  readonly productos = signal<ItemDestacado[]>([
    {
      id: 1,
      nombre: 'Proteína',
      detalle: 'Whey para recuperarte después de entrenar',
      precio: 15000,
      imagen: 'https://www.optimumnutrition.com.co/wp-content/uploads/2020/03/Gold_Standard_Whey_Optimum_Nutrition_2_LB_French_Vanilla.webp',
      alt: 'Bote de proteína whey sabor vainilla',
    },
    {
      id: 2,
      nombre: 'Creatina',
      detalle: 'Monohidrato para fuerza y rendimiento',
      precio: 15000,
      imagen: 'https://ragym.club/wp-content/uploads/CREATINA-NUTREX-1KG-1.jpg',
      alt: 'Bote de creatina de 1 kg',
    },
    {
      id: 3,
      nombre: 'Pre-entreno',
      detalle: 'Energía y enfoque para tu sesión',
      precio: 15000,
      imagen: 'https://i5.walmartimages.com/seo/Raw-Essentials-Pre-Workout-20-Serve-Sour-Grape_37dcd699-a49e-4db9-9131-eec2fc7f2ec3.d17bfb3aae375aad6ec77281ac05cd14.jpeg',
      alt: 'Bote de pre-entreno sabor uva',
    },
    {
      id: 4,
      nombre: 'BCAA',
      detalle: 'Aminoácidos para tomar mientras entrenas',
      precio: 15000,
      imagen: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02522/v/40.jpg',
      alt: 'Bote de BCAA',
    },
    {
      id: 5,
      nombre: 'Mass gainer',
      detalle: 'Calorías y proteína para ganar masa',
      precio: 15000,
      imagen: 'https://www.optimumnutrition.com.co/wp-content/uploads/2023/08/serious-mass-6-lb-vanilla.jpg',
      alt: 'Bolsa de mass gainer sabor vainilla',
    },
    {
      id: 6,
      nombre: 'Quemador',
      detalle: 'Apoyo para tu etapa de definición',
      precio: 15000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_2X_893735-MCO109321461932_042026-P.webp',
      alt: 'Bote de quemador de grasa',
    },
    {
      id: 7,
      nombre: 'Cinturón gym',
      detalle: 'Soporte firme para tus levantamientos',
      precio: 15000,
      imagen: 'https://deportesregol.com/cdn/shop/files/2140_Cinturon_Elisua_Cuero_Negro.jpg?v=1742201122',
      alt: 'Cinturón de levantamiento de cuero negro',
    },
    {
      id: 8,
      nombre: 'Straps',
      detalle: 'Agarre seguro en jalones y peso muerto',
      precio: 15000,
      imagen: 'https://contents.mediadecathlon.com/p2720151/k$5222640a73abcde5e5f703d80b05079f/picture.jpg',
      alt: 'Par de straps de agarre',
    },
  ]);

  agregarAlCarrito(producto: ItemDestacado): void {
    this.carrito.agregar({
      id: 'destacado-' + producto.id,
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
