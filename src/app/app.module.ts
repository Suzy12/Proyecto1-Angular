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
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PaginaPerfilComponent } from './components/pagina-perfil/pagina-perfil.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrearMiembroComponent } from './components/crear-miembro/crear-miembro.component';
import { CrearGrupoComponent } from './components/crear-grupo/crear-grupo.component';
import { CrearZonaRamaComponent } from './components/crear-zona-rama/crear-zona-rama.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ConsultarInfoMiembroComponent } from './components/consultar-info-miembro/consultar-info-miembro.component';
import { ModificarInfoMiembroComponent } from './components/modificar-info-miembro/modificar-info-miembro.component';
import { BuscarMiembroComponent } from './components/buscar-miembro/buscar-miembro.component';
import { ModificarGrupoComponent } from './components/modificar-grupo/modificar-grupo.component';
import { ModificarZonaComponent } from './components/modificar-zona/modificar-zona.component';
import { ModificarRamaComponent } from './components/modificar-rama/modificar-rama.component';
import { AgregarMiembroGrupoComponent } from './components/agregar-miembro-grupo/agregar-miembro-grupo.component';
import { CambiarMiembroGrupoComponent } from './components/cambiar-miembro-grupo/cambiar-miembro-grupo.component';
import { ModificarMovimientoComponent } from './components/modificar-movimiento/modificar-movimiento.component';
import { ConsultarGrupoComponent } from './components/consultar-grupo/consultar-grupo.component';
import { VerMiembrosComponent } from './components/ver-miembros/ver-miembros.component';

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
    VerMiembrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    HttpClientModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUpload);
  }
}
