import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RamaService {
  private ramaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getRamas = (idMovimiento, idZona)  =>  {
    let params = {idMovimiento: idMovimiento, idZona: idZona};
    return this.http.post(this.ramaUrl + '/consultar-ramas', params, { observe: 'response'})
  }

  public getUnaRama = (idMovimiento, idZona, idRama)  =>  {
    let params = {idMovimiento: idMovimiento, idZona: idZona, idRama: idRama};
    return this.http.post(this.ramaUrl + '/get-rama', params, { observe: 'response'})
  }

  public getRamasDisponibles = (idMovimiento, idMiembro)  =>  {
    let params = {idMovimiento: idMovimiento, idMiembro: idMiembro};
    console.log(params);
    return this.http.post(this.ramaUrl + '/consultar-ramas-disponibles', params, { observe: 'response' })
  }

  public getTodasRamasMiembro = (idMovimiento, idZona, idMiembro)  =>  {
    let params = {idMovimiento: idMovimiento, idZona: idZona, idMiembro: idMiembro};
    console.log(params);
    return this.http.post(this.ramaUrl + '/consultar-todas-las-ramas-miembro', params, { observe: 'response' })
  }


  public crearRama = (ramaInfo)  => {
    return this.http.post(this.ramaUrl + '/crear-rama', ramaInfo, { observe: 'response' })
  }

  public consultarMiembrosRama = (idMovimiento, idZona, idRama)  => {
    let params = {idMovimiento: idMovimiento,idZona: idZona, idRama: idRama};
    return this.http.post(this.ramaUrl + '/consultar-miembros-rama', params, { observe: 'response'})
  }

  public consultarRamaDeMiembro = (idMovimiento, idMiembro)  => {
    let params = {idMovimiento: idMovimiento, idMiembro: idMiembro};
    return this.http.post(this.ramaUrl + '/consultar-ramas-miembro', params, { observe: 'response', withCredentials: true })
  }

  public modificarRama = (ramaInfo)  => {
    return this.http.post(this.ramaUrl + '/modificar-rama', ramaInfo, { observe: 'response', withCredentials: true })
  }

  public ramaLider = (idMovimiento, idZona, idMiembro)  => {
    let params = {idMovimiento: idMovimiento, idZona : idZona, idMiembro: idMiembro};
    return this.http.post(this.ramaUrl + '/consultar-ramas-lider', params, { observe: 'response' })
  }
  
}
