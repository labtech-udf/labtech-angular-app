import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MenuItemCommandEvent, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MenuModule,
    DividerModule,
    AvatarModule,
    ConfirmPopupModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  constructor(
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
      { label: 'Eventos', icon: 'pi pi-fw pi-calendar', routerLink: ['/admin/evento'] },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ]
  }

  logout(event: Event) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: '🐼 Deseja sair?',
      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Logout', detail: 'Até mais 🐔' });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Não saiu 🐥' });
      }
    });
  }

}
