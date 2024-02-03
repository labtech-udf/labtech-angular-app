import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { EventosService } from '../admin/eventos/eventos.service';
import { Evento } from '../interfaces/Evento';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterOutlet, CarouselComponent]
})
export class HomeComponent implements OnInit {
  private service = inject(EventosService);
  eventos!: Evento[];
  filter!: Evento[];

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load() {
    (await this.service.getList()).subscribe(data => {
      this.eventos = data;
      // executar logica para filtro em categoria
      this.filter = data;
    })
  }

}
