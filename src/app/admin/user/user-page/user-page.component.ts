import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../auth/auth.service';
import { LayoutService } from '../../../layout/layout.service';
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule,
    InputTextModule, DialogModule,
    ButtonModule, AvatarModule
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {
  private auth = inject(AuthService);
  private layoutService = inject(LayoutService);

  form!: FormGroup;
  skeleton: boolean = false;
  user: any;
  isEdit: boolean = false;
  dialogEdit: boolean = false;

  ngOnInit(): void {
    this.skeleton = true;
    this.getUser();
  }

  getUser() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    if (token && email) {
      const dados = {
        email: email,
        token: token
      }
      console.log(dados)
      this.auth.getUser(dados)
        .subscribe((p) => {
          if (p) {
            this.user = p;
            console.log(this.user);
            this.disableLoadings();
          }
        })
    } else {
      console.log("dfsd")
      const data = {
        name: "Não tem token",
        email: "Dont tem email"
      }
      this.user = data;
      this.disableLoadings();
    }
  }

  disableLoadings() {
    this.skeleton = false;
    this.layoutService.hideProgressBar();
  }

  editPerfil($event: Event) {
    throw new Error('Method not implemented.');
  }

}
