import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedPageModule)
  },
  {
    path: 'pesquisa',
    loadChildren: () => import('./pesquisa/pesquisa.module').then(m => m.PesquisaPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then(m => m.ContaPageModule)
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
