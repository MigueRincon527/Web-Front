import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-vitaminas',
  styleUrl: './vitaminas.css',
  templateUrl: './vitaminas.html',
})
export class Vitaminas {}
