import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgIf } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
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
    DividerModule,
    SkeletonModule,
    NgIf
  ]
})
export class HomeComponent implements OnInit {
  skel: any = {
    card: true,
    filter: true,
    cards: true
  }

  private service = inject(EventosService);
  private auth = inject(AuthService);
  eventos$: Evento[] = [];
  filter!: Evento[];
  msg: any;

  async ngOnInit(): Promise<void> {
    await this.load();
    let num = 500;
    Object.keys(this.skel)
      .forEach(async key => {
        await this.disSkel(key, num);
        num = num + 15;
      })
  }

  async load() {
    this.service.getEventos()
      .subscribe((e: Evento[]) => {
        if (e) {
          this.eventos$ = e;
          this.filter = e.slice(0, 10);
        }
      })
  }

  startSkeleton() {
    Object.keys(this.skel)
      .forEach(key => {
        this.skel[key] = true;
      })
  }

  async disSkel(type: any, time?: any) {
    await new Promise<void>(resolve =>
      setTimeout(() => {
        this.skel[type] = false;
        resolve();
      }, time ? time : 500));

  }

}
