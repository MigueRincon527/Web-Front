import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
}
