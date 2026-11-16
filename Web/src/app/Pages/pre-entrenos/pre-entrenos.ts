import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-pre-entrenos',
  styleUrl: './pre-entrenos.css',
  templateUrl: './pre-entrenos.html',
})
export class PreEntrenos {}
