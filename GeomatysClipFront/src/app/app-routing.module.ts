import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipFormComponent } from './clip-form/clip-form.component';

const routes: Routes = [
  { path: '', component: ClipFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
