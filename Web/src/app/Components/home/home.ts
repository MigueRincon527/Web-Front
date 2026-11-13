import { Component } from '@angular/core';
import { Items } from '../items/items';

@Component({
  standalone: true,
  imports: [Items],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
