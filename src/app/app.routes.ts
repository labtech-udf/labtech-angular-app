import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUpdateComponent } from './admin/eventos/create-update/create-update.component';
import { EventosComponent } from './admin/eventos/eventos.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { EventoDetalhesComponent } from './components/evento-detalhes/evento-detalhes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'evento', component: EventoDetalhesComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'evento', component: EventosComponent },
      { path: 'evento-config', component: CreateUpdateComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
