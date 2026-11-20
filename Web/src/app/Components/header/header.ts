import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service/carrito.service';
import { Auth } from '../../Services/auth/auth';


@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  isStoreMenuOpen = false;
  readonly auth = inject(Auth);
  private readonly router = inject(Router);

  toggleStoreMenu(): void {
    this.isStoreMenuOpen = !this.isStoreMenuOpen;
  }

  closeStoreMenu(): void {
    this.isStoreMenuOpen = false;
  }

  salir(): void {
    this.auth.logout();
    this.closeStoreMenu();
    this.router.navigate(['/home']);
  }

  readonly carrito = inject(CarritoService);
}
