import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './views/blank/blank.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import { registerLocaleData, CommonModule } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { PersonalComponent } from './views/personal/personal.component';
import { InstitucionComponent } from './views/institucion/institucion.component';
import { InstFormComponent } from './views/institucion/inst-form/inst-form.component';
import { InstListComponent } from './views/institucion/inst-list/inst-list.component';
import { PersFormComponent } from './views/personal/pers-form/pers-form.component';
import { PersListComponent } from './views/personal/pers-list/pers-list.component';
import { AsistenciaComponent } from './views/asistencia/asistencia.component';
import { RegistrarComponent } from './views/asistencia/registrar/registrar.component';
import { ConsultarComponent } from './views/asistencia/consultar/consultar.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { UsuarioFormComponent } from './views/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './views/usuario/usuario-list/usuario-list.component';
import { AuthService } from './utils/services/auth.service';
import { AuthGuard } from './utils/guards/auth.guard';
import { MainGuard } from './utils/guards/main.guard';
import { TokenInterceptor } from './utils/token.interceptor';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TardanzaComponent } from './views/tardanza/tardanza.component';
import { PermisoComponent } from './views/permiso/permiso.component';
import { TardanzaListComponent } from './views/tardanza/tardanza-list/tardanza-list.component';
import { PermisoListComponent } from './views/permiso/permiso-list/permiso-list.component';
import { VacacionesComponent } from './views/vacaciones/vacaciones.component';
import { VacacionesFormComponent } from './views/vacaciones/vacaciones-form/vacaciones-form.component';
import { VacacionesListComponent } from './views/vacaciones/vacaciones-list/vacaciones-list.component';
import { LicenciaComponent } from './views/licencia/licencia.component';
import { LicenciaFormComponent } from './views/licencia/licencia-form/licencia-form.component';
import { LicenciaListComponent } from './views/licencia/licencia-list/licencia-list.component';
import { ReporteAsistenciaComponent } from './views/reporte-asistencia/reporte-asistencia.component';
import { ReporteConsolidadoComponent } from './views/reporte-consolidado/reporte-consolidado.component';
import { MisAsistenciasComponent } from './views/mis-asistencias/mis-asistencias.component';
import { MisTardanzasComponent } from './views/mis-tardanzas/mis-tardanzas.component';
import { MisPermisosComponent } from './views/mis-permisos/mis-permisos.component';
import { LogsComponent } from './views/logs/logs.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
    PersonalComponent,
    InstitucionComponent,
    InstFormComponent,
    InstListComponent,
    PersFormComponent,
    PersListComponent,
    AsistenciaComponent,
    RegistrarComponent,
    ConsultarComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    TardanzaComponent,
    PermisoComponent,
    TardanzaListComponent,
    PermisoListComponent,
    VacacionesComponent,
    VacacionesFormComponent,
    VacacionesListComponent,
    LicenciaComponent,
    LicenciaFormComponent,
    LicenciaListComponent,
    ReporteAsistenciaComponent,
    ReporteConsolidadoComponent,
    MisAsistenciasComponent,
    MisTardanzasComponent,
    MisPermisosComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    HttpClientModule,
  ],
  providers: [AuthService,
    AuthGuard,
    MainGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },FlashMessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
