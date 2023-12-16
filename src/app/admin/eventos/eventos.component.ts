import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { EventoDTO } from '../../../interfaces/EventoDTO';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { NgFor, NgIf } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
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
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  eventos!: EventoDTO[];
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

  getDescricaoStatus(event: EventoDTO) {
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

  navigation(item: EventoDTO | null, typ: string) {
    const id = item?.id;
    const type = typ;
    this.router.navigate(['admin', 'evento-config'], { queryParams: { id, type } });
  }

  delete(event: Event, item: EventoDTO) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.delEvent(item);
      },
    })
  }
  async delEvent(item: EventoDTO) {
    // try {
      if (item?.id) {
        await this.service.delete(item.id);
        await this.load();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Evento excluído com sucesso' });
      }
    // } catch (error) {
    //   console.error('Erro ao excluir evento:', error);
    //   this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o evento.' });
    // }
  }

}
