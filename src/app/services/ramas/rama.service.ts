import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RamaService {
  private ramaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getRamas = (idZona)  =>  {
    let params = {idZona: idZona};
    return this.http.post(this.ramaUrl + '/consultar-ramas', params, { observe: 'response', withCredentials: true })
  }

  public getUnaRama = (idZona, idRama)  =>  {
    let params = {idZona: idZona, idRama: idRama};
    return this.http.post(this.ramaUrl + '/get-rama', params, { observe: 'response', withCredentials: true })
  }

  public getRamasDisponibles = (idMiembro)  =>  {
    let params = {idMiembro: idMiembro};
    console.log(params);
    return this.http.post(this.ramaUrl + '/consultar-ramas-disponibles', params, { observe: 'response', withCredentials: true })
  }


  public crearRama = (ramaInfo)  => {
    return this.http.post(this.ramaUrl + '/crear-rama', ramaInfo, { observe: 'response', withCredentials: true })
  }

  public consultarMiembrosRama = (idZona, idRama)  => {
    let params = {idZona: idZona, idRama: idRama};
    return this.http.post(this.ramaUrl + '/consultar-miembros-rama', params, { observe: 'response', withCredentials: true })
  }

  public consultarRamaDeMiembro = (idMiembro)  => {
    let params = {idMiembro: idMiembro};
    return this.http.post(this.ramaUrl + '/consultar-ramas-miembro', params, { observe: 'response', withCredentials: true })
  }

  public modificarRama = (ramaInfo)  => {
    return this.http.post(this.ramaUrl + '/modificar-rama', ramaInfo, { observe: 'response', withCredentials: true })
  }
  
}
