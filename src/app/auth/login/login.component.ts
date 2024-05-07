import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ThemeService } from '../../shared/utils/theme.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  private theme = inject(ThemeService);
  private auth = inject(AuthService);
  private rota: string = '';
  form!: FormGroup;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.rota = params['redirect'];
      console.log('sasa', params['redirect'])
    });
    this.theme.backgroundStored();

  }

  send() {
    const usr = this.form.getRawValue();

    this.auth.login(usr)
      .subscribe({
        next: (response) => {
          if (response) {
            this.getUser(response);
          }
        },
        error: (error) => {
          console.error(error);
          let severity = 'error';
          let summary = '';
          if (error.status >= 400 && error.status < 500) {
            summary = 'Não autorizado';
          } else if (error.status >= 500) {
            summary = 'Erro';
          }
          this.showMsg(severity, summary, error.error?.message);
        }
      });
  }

  private getUser(usr: any) {
    this.auth.getUser(usr)
      .subscribe({
        next: (user) => {
          this.showMsg('success', 'Bem vindo', user.name);
          if (this.rota) {
            this.router.navigate([this.rota]);
          }
        },
        error: (error) => {
          console.error(error);
          this.showMsg('error', 'Erro ao recuperar usuário', error.error?.message); // Use optional chaining
        }
      });
  }

  cad() {

  }

  showMsg(severity: string, summary: string, detail: string) {
    console.log('dsdsa', severity, summary, detail)
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }
}
