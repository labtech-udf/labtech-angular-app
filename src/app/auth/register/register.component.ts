import { NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Usuario } from '../../interfaces/Usuario';
import { ThemeService } from '../../shared/utils/theme.service';
import { emailValidator, nameValidator, passMatchValidator } from '../../shared/utils/validators.directive';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  private theme = inject(ThemeService);
  private service = inject(AuthService);

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, nameValidator]),
      email: new FormControl(null, [Validators.required, emailValidator]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirm_pass: new FormControl(null, [Validators.required])
    }, {
      validators: passMatchValidator
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.theme.backgroundStored();
    }, 1000)
  }

  send() {
    console.log(this.form.getRawValue());
  }

  cad() {
    const form_value = { ... this.form.getRawValue() };
    if (this.form.valid) {
      delete form_value.confirm_pass;
      this.service.register(form_value as Usuario)
        .subscribe((p) => {
          if (p) {
            console.log("User create", p);
          }
        })
    }
  }

  // Utils
  // onPasswordInput(event: any) {
  //   const password = event.target.value;
  //   this.form.get('confirm_pass').setValidators([Validators.required, Validators.equalTo(password)]);
  // }

  // onConfirmPasswordInput(event: any) {
  //   this.form.get('confirm_pass').markAsTouched();
  // }

}
