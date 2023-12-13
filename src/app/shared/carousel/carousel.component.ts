import { Component, Input } from '@angular/core';
import { EventoDTO } from '../../../interfaces/EventoDTO';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() obj!: EventoDTO[];
  @Input() objFilter!: EventoDTO[];
  constructor(private router: Router) { }

  view(id: number) {
    this.router.navigate(['/evento'], { queryParams: { id } });
  }
}
