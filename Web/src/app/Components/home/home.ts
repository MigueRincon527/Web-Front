import { Component } from '@angular/core';
import { Items } from '../items/items';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [Items, RouterLinkActive, RouterLink, RouterOutlet ],  
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
