import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EventosService } from '../admin/eventos/eventos.service';
import { AuthService } from '../auth/auth.service';
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
  private auth = inject(AuthService);
  eventos!: Evento[];
  filter!: Evento[];
  msg: any;
  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load() {
    this.auth.getNoUser().subscribe(p => {
      console.log(p);
      this.msg = p.message;
    });
    
    (await this.service.getList()).subscribe(data => {
      this.eventos = data;
      // executar logica para filtro em categoria
      this.filter = data;
    })
  }

}
