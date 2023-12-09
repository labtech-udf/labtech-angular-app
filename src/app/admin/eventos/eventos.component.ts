import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { EventoDTO } from '../../../interfaces/EventoDTO';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [NgFor ,DataViewModule, ButtonModule, TagModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  eventos!: EventoDTO[];
  layout: 'list' | 'grid' = 'list';
  constructor(
    private service: EventosService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    (await this.service.getList()).subscribe(data => {
      this.eventos = data;
    })
  }

  getStatus(event: EventoDTO) {
    switch (event.status) {
      // C("Em construção"),
      // AV("Avaliação"),
      // R("Recusado"),
      // IN("Inativo"),
      // F("Finalizado"),
      // AP("Aprovado");
      default:
        return 'sucess';
      // default(null)
      //   Success,
      //   Info,
      //   Warning,
      //   Danger
    }
  }

  getDescricaoStatus(event: EventoDTO){
    switch(event.status){
      case 'C' :
        return 'Em construção'
      // C("Em construção"),
      // AV("Avaliação"),
      // R("Recusado"),
      // IN("Inativo"),
      // F("Finalizado"),
      // AP("Aprovado");
      default:
        return 'Sem status'
    }
  }

  navigation(item: EventoDTO | null, typ: string) {
    const id = item?.id;
    const type = typ;
    this.router.navigate(['admin', 'evento-config'], { queryParams: { id, type } });
  }


}
