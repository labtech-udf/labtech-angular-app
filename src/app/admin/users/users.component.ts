import { NgStyle } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    ConfirmPopupModule,
    ToastModule,
    ScrollPanelModule,
    NgStyle
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users!: any[];
  layout: 'list' | 'grid' = 'grid';
  private service = inject(UsersService);


  ngOnInit(): void {
    this.service.getLists()
      .subscribe((p) => {
        p.forEach((element: any, index: number) => {
          const photo = {
            "id": index + 1, // Adicionando 1 para evitar IDs duplicados
            "name": 'Name file ' + `${index}`,
            "type": null,
            "url": "https://source.unsplash.com/random",
            "size": null,
            "key": null
          };

          // Adicionar o objeto photo ao elemento atual da lista
          element.photo = photo;
        });
        this.users = p;
        console.log(p)
      })
  }

}
