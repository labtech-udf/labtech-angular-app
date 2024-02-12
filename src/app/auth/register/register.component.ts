import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from '../../shared/utils/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private theme = inject(ThemeService);

  ngOnInit(): void {
    setTimeout(() => {
      this.theme.backgroundStored();
    }, 1000)
  }
}
