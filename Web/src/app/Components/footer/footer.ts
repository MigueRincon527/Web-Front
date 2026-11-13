import { Component } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  tel = '3205695358';
  email = 'info.rich-power@gmail.com';
  description = 'Suplementación deportiva de élite para atletas que buscan resultados reales.';
}
