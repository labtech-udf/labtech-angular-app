import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ThemeService } from '../../shared/utils/theme.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private theme = inject(ThemeService);
  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.theme.backgroundStored();

  }
  send() {
    console.log(this.form.getRawValue());
  }
  cad() {

  }
}
