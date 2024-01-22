import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { ConfigsService } from '../../admin/eventos/configs/configs.service';
import { Pipemodules } from '../modules/pipes.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, Pipemodules, TagModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  @Input() list!: any[];
  @Input() columns: any[] = [];
  constructor(private service: ConfigsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      // console.log(this.list, this.columns)
    }, 500);
  }
  edit(obj: any) {

  }

  del(obj: any, api: string) {
    console.error(api, obj);
  }
}
