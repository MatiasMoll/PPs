import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrillaFotosPage } from './grilla-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: GrillaFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrillaFotosPageRoutingModule {}
