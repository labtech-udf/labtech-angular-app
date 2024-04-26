import { Injectable, inject } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private msgService = inject(MessageService);

  showMsg(severity: string, summary: string, detail: string) {
    this.msgService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }
}