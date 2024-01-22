import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

import { Evento } from '../../interfaces/Evento';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() obj!: Evento[];
  @Input() objFilter!: Evento[];
  constructor(private router: Router) { }

  view(id: number) {
    this.router.navigate(['/evento'], { queryParams: { id } });
  }
}
