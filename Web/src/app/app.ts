import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './Components/footer/footer';
import { Header } from './Components/header/header';

@Component({
  imports: [RouterOutlet, Footer, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Web');
  readonly router = inject(Router);

  mostrarNavegacion(): boolean {
    const ruta = this.router.url.split(/[?#]/)[0];
    return ruta !== '/login' && ruta !== '/register';
  }
}


