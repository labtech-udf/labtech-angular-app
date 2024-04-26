import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from "./layout/footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { ThemeService } from './shared/utils/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService],
  imports: [CommonModule, RouterOutlet, ToolbarComponent,
     ToastModule, FooterComponent, LayoutComponent]
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private cdr = inject(ChangeDetectorRef);


  title = 'Eventos - APP';
  bgValue: string | undefined;
  ngOnInit(): void {
    this.theme.background$.subscribe((p) => {
      this.bgValue = p != null ? p : 'var(--cor_1)';
      this.cdr.detectChanges();
    })
  }
}
