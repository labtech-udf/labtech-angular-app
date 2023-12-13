import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from "./layout/footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [ConfirmationService, MessageService],
    imports: [CommonModule, RouterOutlet, ToolbarComponent, ToastModule, FooterComponent, LayoutComponent]
})
export class AppComponent {
  title = 'labtech-angular-app';
}
