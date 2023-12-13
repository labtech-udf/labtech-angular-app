import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { EventoDTO } from '../../interfaces/EventoDTO';
import { CarouselComponent } from "../shared/carousel/carousel.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [RouterOutlet, CarouselComponent]
})
export class HomeComponent implements OnInit {
  eventos!: EventoDTO[];
  filter!: EventoDTO[];
  constructor(
    private router: Router,
    private service: EventosService
  ) {

  }
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
