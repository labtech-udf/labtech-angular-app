import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DividerModule } from 'primeng/divider';
import { EventosService } from '../admin/eventos/eventos.service';
import { AuthService } from '../auth/auth.service';
import { Evento } from '../interfaces/Evento';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    RouterOutlet,
    CarouselComponent,
    DividerModule
  ]
})
export class HomeComponent implements OnInit {

  private service = inject(EventosService);
  private auth = inject(AuthService);
  eventos$: Evento[] = [];
  filter!: Evento[];
  msg: any;

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load() {
    this.service.getEventos()
      .subscribe((e: Evento[]) => {
        this.eventos$ = e;
        this.filter = e.slice(0, 10);
        console.log("T: " + e.length, "F: " + this.filter.length)
      })
  }

}
