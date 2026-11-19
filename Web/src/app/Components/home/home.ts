import { Component } from '@angular/core';
import { Items } from '../items/items';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [Items, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
