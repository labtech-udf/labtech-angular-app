import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../../../services/eventos.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-evento-detalhes',
  standalone: true,
  imports: [DividerModule, ButtonModule, ToastModule],
  templateUrl: './evento-detalhes.component.html',
  styleUrl: './evento-detalhes.component.scss'
})
export class EventoDetalhesComponent implements OnInit {
  event!: any;
  skeleton: boolean = false;
  imageUrl: string | null = null;
  items: any[] = [
    { name: 'Professor Y', photo: 'profile.jpg' },
    { name: 'Professora X', photo: 'profile2.jpg' },
    { name: 'Pessoa tal', photo: 'profile3.png' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventosService,
    private messageService: MessageService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.skeleton = true;
    await this.load();
    this.skeleton = false;
  }

  async load(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];
      if (id) {
        (await this.service.getByIds(id)).subscribe(async data => {
          if (data) {
            this.event = data;
            console.log(data);
            if (data?.photo?.id) {
              const url = 'http://localhost:8180/arquivo/' + data?.photo?.id + '/download';
              this.imageUrl = url;
            } else {
              this.imageUrl = data.cor != null && data.cor != '' ? data.cor : '#6891F2';
            }
          }
        })
      }
    })
  }

  choice() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Em breve você recebera mais informações no email' });
    // this.router.navigate(['/home']);
  }


  back() {
    this.router.navigate(['/home']);
  }

}
