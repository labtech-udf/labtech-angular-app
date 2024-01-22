import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { Evento } from '../../interfaces/Evento';
import { EventosService } from './eventos.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DataViewModule,
    ButtonModule,
    TagModule,
    ConfirmPopupModule,
    ToastModule,
    ScrollPanelModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  eventos!: Evento[];
  layout: 'list' | 'grid' = 'grid';
  constructor(
    private service: EventosService,
    private router: Router,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load() {
    (await this.service.getList()).subscribe(data => {
      this.eventos = data;
      console.error(data)
    })
  }

  getStatus(event: Evento) {
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

  getDescricaoStatus(event: Evento) {
    switch (event.status) {
      case 'C':
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

  navigation(item: Evento | null, typ: string) {
    const id = item?.id;
    const type = typ;
    this.router.navigate(['admin', 'event-manager'], { queryParams: { id, type } });
  }

  delete(event: Event, item: Evento) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.delEvent(item);
      },
    })
  }
  async delEvent(item: Evento) {
    try {
      if (item?.id) {
        await this.service.delete(item.id);
        await this.load();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento excluído com sucesso' });
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o evento.' });
    }
  }

}
