import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';
import { CatalogoService, ProductoCatalogo } from '../../Services/catalogo.service/catalogo.service';

@Component({
  imports: [RouterLink],
  selector: 'app-items',
  styleUrl: './items.css',
  templateUrl: './items.html',
})
export class Items {
  private readonly catalogo = inject(CatalogoService);
  private readonly carrito = inject(CarritoService);

  readonly productos = this.catalogo.porSeccion('destacados');

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
