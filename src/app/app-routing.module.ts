import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { ProjectPageComponent } from './page/project-page/project-page.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: 'home',
  //   component: HomePageComponent,
  // },
  // {
  //   path: 'about',
  //   loadChildren: () =>
  //     import('./page/about-page/about-page.module').then(
  //       (m) => m.AboutPageModule
  //     ),
  // },
  // {
  //   path: 'contact',
  //   component: ContactPageComponent,
  // },
  // {
  //   path: 'projects',
  //   component: ProjectPageComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
