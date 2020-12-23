import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScratchComponent} from './views/scratch/scratch.component';
import {SettingComponent} from './views/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: ScratchComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
