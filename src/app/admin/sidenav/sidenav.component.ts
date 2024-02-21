import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import { MenuItem } from '../../interfaces/Utils';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    DividerModule,
    AvatarModule,
    ConfirmPopupModule,
    ToastModule,
    ButtonModule
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

  menu: MenuItem[] = [];

  ngOnInit(): void {
    this.menu = [
      { label: 'Home', icon: 'pi pi-home', action: () => this.navigateTo('/admin') },
      {
        label: 'Eventos', icon: 'pi pi-fw pi-calendar', subitems: [
          { label: 'Lista de eventos', icon: 'pi pi-fw pi-list', action: () => this.navigateTo('/admin/eventos') },
          { label: 'Settings', icon: 'pi pi-fw pi-cog', action: () => this.navigateTo('/admin/event-config') },
        ]
      },
      {
        label: 'users', icon: 'pi pi-user', subitems: [
          { label: 'Lista de usuarios', icon: 'pi pi-fw pi-list', action: () => this.navigateTo('/admin/usuarios') },
          { label: 'Settings', icon: 'pi pi-fw pi-cog', action: () => this.navigateTo('/admin/event-config') },
        ]
      },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ]
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  toogleMenu(menu: MenuItem) {
    menu.expanded = !menu.expanded;
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
