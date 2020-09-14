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
import { ConsultarComponent } from './views/asistencia/consultar/consultar.component';
import { RegistrarComponent } from './views/asistencia/registrar/registrar.component';
import { UsuarioFormComponent } from './views/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './views/usuario/usuario-list/usuario-list.component';
import { MainGuard } from './utils/guards/main.guard';
import { TardanzaComponent } from './views/tardanza/tardanza.component';
import { TardanzaListComponent } from './views/tardanza/tardanza-list/tardanza-list.component';
import { PermisoListComponent } from './views/permiso/permiso-list/permiso-list.component';
import { VacacionesFormComponent } from './views/vacaciones/vacaciones-form/vacaciones-form.component';
import { VacacionesListComponent } from './views/vacaciones/vacaciones-list/vacaciones-list.component';
import { LicenciaFormComponent } from './views/licencia/licencia-form/licencia-form.component';
import { LicenciaListComponent } from './views/licencia/licencia-list/licencia-list.component';
import { ReporteAsistenciaComponent } from './views/reporte-asistencia/reporte-asistencia.component';
import { ReporteConsolidadoComponent } from './views/reporte-consolidado/reporte-consolidado.component';
import { MisAsistenciasComponent } from './views/mis-asistencias/mis-asistencias.component';
import { MisTardanzasComponent } from './views/mis-tardanzas/mis-tardanzas.component';
import { MisPermisosComponent } from './views/mis-permisos/mis-permisos.component';
import { LogsComponent } from './views/logs/logs.component';

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
        path: 'asistencia/register',
        component: RegistrarComponent,
      },
      {
        path: 'asistencia/list',
        component: ConsultarComponent,
      },
      {
        path: 'usuario/add',
        component: UsuarioFormComponent,
      },
      {
        path: 'usuario/list',
        component: UsuarioListComponent,
      },
      {
        path: 'tardanza/list',
        component: TardanzaListComponent,
      },
      {
        path: 'permiso/list',
        component: PermisoListComponent,
      },
      {
        path: 'vacaciones/add',
        component: VacacionesFormComponent,
      },
      {
        path: 'vacaciones/list',
        component: VacacionesListComponent,
      },
      {
        path: 'licencia/add',
        component: LicenciaFormComponent,
      },
      {
        path: 'licencia/list',
        component: LicenciaListComponent,
      },
      {
        path: 'reporte-asistencia',
        component: ReporteAsistenciaComponent,
      },
      {
        path: 'reporte-consolidado',
        component: ReporteConsolidadoComponent,
      },
      {
        path: 'mis-asistencias',
        component: MisAsistenciasComponent,
      },
      {
        path: 'mis-tardanzas',
        component: MisTardanzasComponent,
      },
      {
        path: 'mis-permisos',
        component: MisPermisosComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  /**{
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },**/
  {
    path: 'register',
    component: RegisterComponent,
    //canActivate: [NonAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
