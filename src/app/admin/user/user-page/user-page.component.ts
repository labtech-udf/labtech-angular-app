import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { LayoutService } from '../../../layout/layout.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {
  private auth = inject(AuthService);
  private layoutService = inject(LayoutService);
  skeleton: boolean = false;
  user: any;
  isEdit: boolean = false;

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
}
