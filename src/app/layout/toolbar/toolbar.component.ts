import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ThemeService } from '../../shared/utils/theme.service';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    TagModule,
    TieredMenuModule,
    AvatarModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  private router = inject(Router);
  private theme = inject(ThemeService);

  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Cadastro',
        icon: 'pi pi-id-card',
        command: () => {
          this.actions('cad');
        }
      },
      {
        label: 'login',
        icon: 'pi pi-sign-in',
        command: () => {
          this.actions('login');
        }
      },
      {
        label: 'Admin',
        icon: 'pi pi-key',
        command: () => {
          this.actions('adm');
        }
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out'
      }
    ]
  }

  actions(rota?: string) {
    switch (rota) {
      case 'cad':
        this.theme.setBackground('linear-gradient(225deg, #ffffff 55%, #3f83f0 88%)');
        this.router.navigate(['auth-register']);
        break;
      case 'login':
        this.theme.setBackground('linear-gradient(43deg, #ffffff 56%, #3f83f0 100%)');
        this.router.navigate(['auth-login']);
        break;
      case 'adm':
        this.theme.setBackground('linear-gradient(180deg, #ffffff 55%, #3f83f0 88%)');
        this.router.navigate(['admin']);
        break;
      default:
        this.theme.setBackground('#FFF');
        this.router.navigate(['']);
        break;
    }
  }

}
