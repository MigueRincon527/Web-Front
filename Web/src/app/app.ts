import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './Components/footer/footer';
import { Header } from './Components/header/header';
import { Home } from './Components/home/home';

@Component({
  imports: [RouterOutlet, Footer, Header, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Web');
}


