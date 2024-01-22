import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { ConfigsComponent } from './admin/eventos/configs/configs.component';
import { CreateUpdateComponent } from './admin/eventos/create-update/create-update.component';
import { EventosComponent } from './admin/eventos/eventos.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { EventoDetalhesComponent } from './components/evento-detalhes/evento-detalhes.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'evento', component: EventoDetalhesComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'event-manager', component: CreateUpdateComponent },
      { path: 'event-config', component: ConfigsComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
