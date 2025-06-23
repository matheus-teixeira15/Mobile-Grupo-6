import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaPageRoutingModule } from './conta-routing.module';

import { ContaPage } from './conta.page';
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaPageRoutingModule,
    LoadingComponent
  ],
  declarations: [ContaPage]
})
export class ContaPageModule {}
