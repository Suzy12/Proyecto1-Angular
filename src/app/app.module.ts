import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockerModule } from 'angular-safeguard';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ToastrModule } from 'ngx-toastr';


import { NavComponent } from './components/components-styles/nav/nav.component';
import { MenuComponent } from './components/components-styles/menu/menu.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PaginaPerfilComponent } from './components/pagina-perfil/pagina-perfil.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { FooterComponent } from './components/components-styles/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrearMiembroComponent } from './components/crear/crear-miembro/crear-miembro.component';
import { CrearGrupoComponent } from './components/crear/crear-grupo/crear-grupo.component';
import { CrearZonaRamaComponent } from './components/crear/crear-zona-rama/crear-zona-rama.component';
import { NavMenuComponent } from './components/components-styles/nav-menu/nav-menu.component';
import { ConsultarInfoMiembroComponent } from './components/consultar/consultar-info-miembro/consultar-info-miembro.component';
import { ModificarInfoMiembroComponent } from './components/modificar/modificar-info-miembro/modificar-info-miembro.component';
import { BuscarMiembroComponent } from './components/consultar/buscar-miembro/buscar-miembro.component';
import { ModificarGrupoComponent } from './components/modificar/modificar-grupo/modificar-grupo.component';
import { ModificarZonaComponent } from './components/modificar/modificar-zona/modificar-zona.component';
import { ModificarRamaComponent } from './components/modificar/modificar-rama/modificar-rama.component';
import { AgregarMiembroGrupoComponent } from './components/agregar-miembro-grupo/agregar-miembro-grupo.component';
import { CambiarMiembroGrupoComponent } from './components/cambiar-miembro-grupo/cambiar-miembro-grupo.component';
import { ModificarMovimientoComponent } from './components/modificar/modificar-movimiento/modificar-movimiento.component';
import { ConsultarGrupoComponent } from './components/consultar/consultar-grupo/consultar-grupo.component';
import { VerMiembrosComponent } from './components/consultar/ver-miembros/ver-miembros.component';
import { CrearNoticiaComponent } from './components/crear/crear-noticia/crear-noticia.component';
import { VerNotificacionesComponent } from './components/consultar/ver-notificaciones/ver-notificaciones.component'
import { VerComposicionMisGruposComponent } from './components/consultar/ver-composicion-mis-grupos/ver-composicion-mis-grupos.component'
import { VerComposicionMisGruposLiderComponent } from './components/consultar/ver-composicion-mis-grupos-lider/ver-composicion-mis-grupos-lider.component'

import { LoginService } from './services/login/login.service'
import { LoginGuard } from './services/login/login.guard';
import { RoleGuard } from './services/login/role.guard';

import { ConsultarInfoMovimientoComponent } from './components/consultar/consultar-info-movimiento/consultar-info-movimiento.component';
import { RegistrarMovimientoComponent } from './components/registrar/registrar-movimiento/registrar-movimiento.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { ConsultarPerfilComponent } from './components/perfil/consultar-perfil/consultar-perfil.component';
import { RegistrarMiembroComponent } from './components/registrar/registrar-miembro/registrar-miembro.component';
import { VerPuestosComponent } from './components/consultar/ver-puestos/ver-puestos.component';
import { ComposicionRamaZonaComponent } from './components/consultar/composicion-rama-zona/composicion-rama-zona.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    PaginaPrincipalComponent,
    PaginaPerfilComponent,
    IniciarSesionComponent,
    FooterComponent,
    CrearMiembroComponent,
    CrearGrupoComponent,
     CrearZonaRamaComponent,
    NavMenuComponent,
    ConsultarInfoMiembroComponent,
    ModificarInfoMiembroComponent,
    BuscarMiembroComponent,
    ModificarGrupoComponent,
    ModificarZonaComponent,
    ModificarRamaComponent,
    AgregarMiembroGrupoComponent,
    CambiarMiembroGrupoComponent,
    ModificarMovimientoComponent,
    ConsultarGrupoComponent,
    VerMiembrosComponent,
    ConsultarInfoMovimientoComponent,
    RegistrarMovimientoComponent,
    EditarPerfilComponent,
    ConsultarPerfilComponent,
    RegistrarMiembroComponent,
    VerPuestosComponent,
    ComposicionRamaZonaComponent,
    CrearNoticiaComponent,
    VerNotificacionesComponent,
    VerComposicionMisGruposComponent,
    VerComposicionMisGruposLiderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    LockerModule,
    StorageServiceModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }, 
    LoginService,
    LoginGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUpload);
  }
}
