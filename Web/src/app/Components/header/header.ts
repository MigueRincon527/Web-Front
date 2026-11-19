import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';


@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  isStoreMenuOpen = false;

  toggleStoreMenu(): void {
    this.isStoreMenuOpen = !this.isStoreMenuOpen;
  }

  closeStoreMenu(): void {
    this.isStoreMenuOpen = false;
  }

  readonly carrito = inject(CarritoService);
}
