import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { FooterComponent } from './footer/footer.component';
import { LayoutService } from './layout.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ToolbarComponent, FooterComponent,
    RouterOutlet, ProgressBarModule, NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  initProgressBar: boolean = false;

  private layoutService = inject(LayoutService);

  ngOnInit(): void {
    this.layoutService.progressVisible$
      .subscribe((isVisible: boolean) => {
        this.initProgressBar = isVisible;
      })
  }
}
