import { Component, Input, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { NgClass } from '@angular/common';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfigsService } from '../../admin/eventos/configs/configs.service';
import { ListModalComponent } from './list-modal/list-modal.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    ScrollPanelModule,
    NgClass,
    DynamicDialogModule
  ],
  providers: [DialogService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  private service = inject(ConfigsService);
  private dialogService = inject(DialogService)

  @Input() list!: any[];
  @Input() columns: any[] = [];
  @Input() title: String = '';
  @Input() configs: {} = {}

  ref: DynamicDialogRef | undefined;


  visible: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {

      // console.log(this.list, this.columns)

    }, 500);
  }

  edit(obj: any) {
    console.log(obj)
    this.ref = this.dialogService.open(
      ListModalComponent, {
      header: obj.name,
      width: '30vw',
      contentStyle: { overflow: 'auto' },
      data: obj
    });

  }

  del(obj: any, api: string) {
    console.error(api, obj);
  }

}
