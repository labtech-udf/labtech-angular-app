import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../shared/utils/theme.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {
  private router = inject(Router);
  private theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.backgroundStored();
  }

  navigate() {
    this.router.navigate(['']);
  }
}
