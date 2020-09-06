import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlankComponent } from './views/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PersonalComponent } from './views/personal/personal.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { InstitucionComponent } from './views/institucion/institucion.component';
import { InstListComponent } from './views/institucion/inst-list/inst-list.component';
import { PersListComponent } from './views/personal/pers-list/pers-list.component';
import { PersFormComponent } from './views/personal/pers-form/pers-form.component';
import { InstFormComponent } from './views/institucion/inst-form/inst-form.component';
import { AsistenciaComponent } from './views/asistencia/asistencia.component';
import { MainGuard } from './utils/guards/main.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: MainComponent,
    canActivate: [MainGuard],
    canLoad: [MainGuard],
    //canActivateChild: [AuthGuard],

    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'blank',
        component: BlankComponent,
      },
      {
        path: 'personal/list',
        component: PersListComponent,
      },
      {
        path: 'personal/add',
        component: PersFormComponent,
      },
      {
        path: 'personal/edit/:id',
        component: PersFormComponent,
      },
      {
        path: 'institucion/list',
        component: InstListComponent,
      },
      {
        path: 'institucion/add',
        component: InstFormComponent,
      },
      {
        path: 'institucion/edit/:id',
        component: InstFormComponent,
      },
      {
        path: 'asistencia',
        component: AsistenciaComponent,
      },
      {
        path: 'dass',
        component: DashboardComponent,
      },
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'register',
    component: RegisterComponent,
    //canActivate: [NonAuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
