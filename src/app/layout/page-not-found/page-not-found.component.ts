import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router){}
  navigate(){
    this.router.navigate(['']);
  }
}
