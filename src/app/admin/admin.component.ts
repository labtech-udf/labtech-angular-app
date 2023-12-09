import { Component } from '@angular/core';
import { EventosComponent } from "./eventos/eventos.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [EventosComponent, SidenavComponent, RouterOutlet]
})
export class AdminComponent {

}
