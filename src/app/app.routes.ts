import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUpdateComponent } from './admin/eventos/create-update/create-update.component';
import { EventosComponent } from './admin/eventos/eventos.component';

export const routes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'admin', component: AdminComponent,
   children: [
    {path: 'evento', component: EventosComponent},
    {path: 'evento-config', component: CreateUpdateComponent}
   ]
  }
];
