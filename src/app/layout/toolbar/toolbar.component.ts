import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(
    private router: Router,
  ) {

  }
  navigation(rota: string) {
    this.router.navigate([rota]);
  }
  open(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
