import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Generales
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component' 
import { PaginaPerfilComponent } from './components/pagina-perfil/pagina-perfil.component'

//Simple Action
import { AgregarMiembroGrupoComponent } from './components/agregar-miembro-grupo/agregar-miembro-grupo.component'
import { CambiarMiembroGrupoComponent } from './components/cambiar-miembro-grupo/cambiar-miembro-grupo.component'

//Crear
import { CrearGrupoComponent } from './components/crear/crear-grupo/crear-grupo.component'
import { CrearMiembroComponent } from './components/crear/crear-miembro/crear-miembro.component'
import { CrearZonaRamaComponent } from './components/crear/crear-zona-rama/crear-zona-rama.component'

//Consultar
import { BuscarMiembroComponent } from './components/consultar/buscar-miembro/buscar-miembro.component'
import { ConsultarGrupoComponent } from './components/consultar/consultar-grupo/consultar-grupo.component'
import { ConsultarInfoMiembroComponent } from './components/consultar/consultar-info-miembro/consultar-info-miembro.component'
import { VerMiembrosComponent } from './components/consultar/ver-miembros/ver-miembros.component'

//Modificar
import { ModificarGrupoComponent } from './components/modificar/modificar-grupo/modificar-grupo.component'
import { ModificarInfoMiembroComponent } from './components/modificar/modificar-info-miembro/modificar-info-miembro.component'
import { ModificarMovimientoComponent } from './components/modificar/modificar-movimiento/modificar-movimiento.component'
import { ModificarRamaComponent } from './components/modificar/modificar-rama/modificar-rama.component'
import { ModificarZonaComponent } from './components/modificar/modificar-zona/modificar-zona.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: IniciarSesionComponent },
  { path: 'home', pathMatch: 'full', component: PaginaPrincipalComponent },
  { path: 'perfil', pathMatch: 'full', component: PaginaPerfilComponent },
  { path: 'agregar-miembro-grupo', pathMatch: 'full', component: AgregarMiembroGrupoComponent },
  { path: 'cambiar-miembro-grupo', pathMatch: 'full', component: CambiarMiembroGrupoComponent },
  {
    path: 'crear',
    children: [
      { path: '', redirectTo: 'grupo', pathMatch: 'full' },
      { path: 'grupo', component: CrearGrupoComponent },
      { path: 'miembro', component: CrearMiembroComponent},
      { path: 'zona-rama', component: CrearZonaRamaComponent},
    ]
  },
  {
    path: 'consultar',
    children: [
      { path: '', redirectTo: 'grupo', pathMatch: 'full' },
      { path: 'grupo', component: ConsultarGrupoComponent },
      { path: 'buscar', component: BuscarMiembroComponent },
      { path: 'info-miembro', component: ConsultarInfoMiembroComponent },
      { path: 'miembros', component: VerMiembrosComponent }
    ]
  },
  {
    path: 'modificar',
    children: [
      { path: '', redirectTo: 'zona', pathMatch: 'full' },
      { path: 'zona', component: ModificarZonaComponent },
      { path: 'rama', component: ModificarRamaComponent },
      { path: 'grupo', component: ModificarGrupoComponent },
      { path: 'info-miembro', component: ModificarInfoMiembroComponent },
      { path: 'movimiento', component: ModificarMovimientoComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
