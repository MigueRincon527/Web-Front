import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-accesorios',
  styleUrl: './accesorios.css',
  templateUrl: './accesorios.html',
})
export class Accesorios {}
