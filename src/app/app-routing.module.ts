import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Generales
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component' 
import { PaginaPerfilComponent } from './components/pagina-perfil/pagina-perfil.component'

//Simple Action
import { AgregarMiembroGrupoComponent } from './components/agregar-miembro-grupo/agregar-miembro-grupo.component'
import { CambiarMiembroGrupoComponent } from './components/cambiar-miembro-grupo/cambiar-miembro-grupo.component'

//Perfil
import { ConsultarPerfilComponent } from './components/perfil/consultar-perfil/consultar-perfil.component'
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component'

//Crear
import { CrearGrupoComponent } from './components/crear/crear-grupo/crear-grupo.component'
import { CrearMiembroComponent } from './components/crear/crear-miembro/crear-miembro.component'
import { CrearZonaRamaComponent } from './components/crear/crear-zona-rama/crear-zona-rama.component'
import { CrearNoticiaComponent } from './components/crear/crear-noticia/crear-noticia.component';

//Consultar
import { BuscarMiembroComponent } from './components/consultar/buscar-miembro/buscar-miembro.component'
import { ConsultarGrupoComponent } from './components/consultar/consultar-grupo/consultar-grupo.component'
import { ConsultarInfoMiembroComponent } from './components/consultar/consultar-info-miembro/consultar-info-miembro.component'
import { VerMiembrosComponent } from './components/consultar/ver-miembros/ver-miembros.component'
import { ConsultarInfoMovimientoComponent } from './components/consultar/consultar-info-movimiento/consultar-info-movimiento.component'
import { VerPuestosComponent } from './components/consultar/ver-puestos/ver-puestos.component'
import { ComposicionRamaZonaComponent } from './components/consultar/composicion-rama-zona/composicion-rama-zona.component'
import { VerNotificacionesComponent } from './components/consultar/ver-notificaciones/ver-notificaciones.component'
import { VerComposicionMisGruposComponent } from './components/consultar/ver-composicion-mis-grupos/ver-composicion-mis-grupos.component'
import { VerComposicionMisGruposLiderComponent } from './components/consultar/ver-composicion-mis-grupos-lider/ver-composicion-mis-grupos-lider.component'

//Modificar
import { ModificarGrupoComponent } from './components/modificar/modificar-grupo/modificar-grupo.component'
import { ModificarInfoMiembroComponent } from './components/modificar/modificar-info-miembro/modificar-info-miembro.component'
import { ModificarMovimientoComponent } from './components/modificar/modificar-movimiento/modificar-movimiento.component'
import { ModificarRamaComponent } from './components/modificar/modificar-rama/modificar-rama.component'
import { ModificarZonaComponent } from './components/modificar/modificar-zona/modificar-zona.component'

//Registrar
import { RegistrarMovimientoComponent } from "./components/registrar/registrar-movimiento/registrar-movimiento.component"
import { RegistrarMiembroComponent } from "./components/registrar/registrar-miembro/registrar-miembro.component"

import { RoleGuard } from './services/login/role.guard'


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: IniciarSesionComponent },
  { path: 'home', pathMatch: 'full', component: PaginaPrincipalComponent },
  { path: 'perfil', pathMatch: 'full', component: PaginaPerfilComponent },
  { path: 'registrar-movimiento', pathMatch: 'full', component: RegistrarMovimientoComponent },
  { path: 'registrar-miembro', pathMatch: 'full', component: RegistrarMiembroComponent },
  { path: 'agregar-miembro-grupo', pathMatch: 'full', component: AgregarMiembroGrupoComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
  { path: 'cambiar-miembro-grupo', pathMatch: 'full', component: CambiarMiembroGrupoComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
  { path: 'editar-perfil', pathMatch: 'full', component: EditarPerfilComponent },
  { path: 'consultar-perfil', pathMatch: 'full', component: ConsultarPerfilComponent },
  {
    path: 'crear',
    children: [
      { path: '', redirectTo: 'grupo', pathMatch: 'full' },
      { path: 'grupo', component: CrearGrupoComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'miembro', component: CrearMiembroComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'zona-rama', component: CrearZonaRamaComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'noticia', component: CrearNoticiaComponent, canActivate: [RoleGuard], data: { allowedRoles: [2,3,4,5,6], redirectTo: '/perfil', key: 'current-user-role'} },
    ]
  },
  {
    path: 'consultar',
    children: [
      { path: '', redirectTo: 'grupo', pathMatch: 'full' },
      { path: 'grupo', component: ConsultarGrupoComponent, canActivate: [RoleGuard], data: { allowedRoles: [2,3,4,5,6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'buscar', component: BuscarMiembroComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'info-miembro', component: ConsultarInfoMiembroComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'miembros', component: VerMiembrosComponent, canActivate: [RoleGuard], data: { allowedRoles: [2,3,4,5,6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'movimiento', component: ConsultarInfoMovimientoComponent },
      { path: 'puestos', component: VerPuestosComponent },
      { path: 'composicion-rama-zona', component: ComposicionRamaZonaComponent, canActivate: [RoleGuard], data: { allowedRoles: [2,3,4,5,6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'composicion-grupos-lider', component: VerComposicionMisGruposLiderComponent, canActivate: [RoleGuard], data: { allowedRoles: [2,3,4,5,6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'composicion-grupos', component: VerComposicionMisGruposComponent },
      { path: 'notificaciones', component: VerNotificacionesComponent }
    ]
  },
  {
    path: 'modificar',
    children: [
      { path: '', redirectTo: 'zona', pathMatch: 'full' },
      { path: 'zona', component: ModificarZonaComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'rama', component: ModificarRamaComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'grupo', component: ModificarGrupoComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'info-miembro', component: ModificarInfoMiembroComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} },
      { path: 'movimiento', component: ModificarMovimientoComponent, canActivate: [RoleGuard], data: { allowedRoles: [5, 6], redirectTo: '/perfil', key: 'current-user-role'} }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
