import { Component, OnInit } from '@angular/core';

import { ODS } from '../../../interfaces/Ods';
import { TableColumn } from '../../../interfaces/Utils';
import { ListComponent } from '../../../shared/list/list.component';
import { ConfigsService } from './configs.service';

@Component({
  selector: 'app-configs',
  standalone: true,
  templateUrl: './configs.component.html',
  styleUrl: './configs.component.scss',
  imports: [ListComponent]
})
export class ConfigsComponent implements OnInit {
  constructor(private service: ConfigsService) { }

  ngOnInit(): void {
    this.listODS();
  }
  // ODS - Objetivos de Desenvolvimento Sustentável
  ods: ODS[] = [];
  columnsODS: TableColumn[] = [];

  listODS() {
    this.service.getLists('listods').subscribe((p) => {
      console.log(p);
      this.ods = p;
      this.columnsODS = [
        { field: 'name', header: 'Nome' },
        { field: 'description', header: 'Descrição' },
        { field: 'status', header: 'Status', isBoolean: true },
        { field: 'action', header: 'Action', isAction: true, api: 'ods' }
      ]
    })
  }

}
