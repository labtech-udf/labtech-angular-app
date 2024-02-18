import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfigsService } from '../../../admin/eventos/configs/configs.service';

@Component({
  selector: 'app-list-modal',
  standalone: true,
  imports: [],
  templateUrl: './list-modal.component.html',
  styleUrl: './list-modal.component.scss'
})
export class ListModalComponent implements OnInit {
  private ref = inject(DynamicDialogConfig);
  private service = inject(ConfigsService);
  data: any[] = [];

  ngOnInit(): void {
    const data = this.ref.data
    console.log(data)
  }

}
