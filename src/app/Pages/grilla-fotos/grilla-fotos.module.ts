import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrillaFotosPageRoutingModule } from './grilla-fotos-routing.module';

import { GrillaFotosPage } from './grilla-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrillaFotosPageRoutingModule
  ],
  declarations: [GrillaFotosPage]
})
export class GrillaFotosPageModule {}
