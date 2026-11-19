import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';

@Component({
  imports: [RouterLink],
  selector: 'app-carrito',
  styleUrl: './carrito.css',
  templateUrl: './carrito.html',
})
export class Carrito {
  private readonly carrito = inject(CarritoService);

  readonly productos = this.carrito.productos;
  readonly unidades = this.carrito.unidades;
  readonly subtotal = this.carrito.subtotal;
  readonly envio = this.carrito.envio;
  readonly total = this.carrito.total;

  aumentarCantidad(id: string): void {
    this.carrito.cambiarCantidad(id, 1);
  }

  disminuirCantidad(id: string): void {
    this.carrito.cambiarCantidad(id, -1);
  }

  eliminarProducto(id: string): void {
    this.carrito.eliminar(id);
  }

  vaciarCarrito(): void {
    this.carrito.vaciar();
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}