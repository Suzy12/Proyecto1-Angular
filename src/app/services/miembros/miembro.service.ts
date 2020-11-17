import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  private miembroUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUnMiembro = (idMiembro)  =>  {
    return this.http.post(this.miembroUrl + '/get-miembro', idMiembro, { observe: 'response', withCredentials: true })
  }

  public getUnMiembroxID = (idMiembro)  =>  {
    let params = {idMiembro: idMiembro};
    return this.http.post(this.miembroUrl + '/get-miembro', params, { observe: 'response', withCredentials: true })
  }

  public modificarInfoMiembro = (infoMiembro) => {
    return this.http.post(this.miembroUrl + '/modificar-miembro', infoMiembro, {observe: 'response', withCredentials: true})
  }

  public crearMiembro = (infoMiembro) => {
    return this.http.post(this.miembroUrl + '/crear-miembro', infoMiembro, {observe: 'response', withCredentials: true})
  }

  public getAllMonitores = (idZona) => {
    let params = {idZona: idZona};
    return this.http.post(this.miembroUrl + '/consultar-monitores-zona', params, {observe: 'response', withCredentials: true})
  }

  public getMonitoresPosibles = (infoGrupo) => {
    return this.http.post(this.miembroUrl + '/consultar-monitores-probables', infoGrupo, {observe: 'response', withCredentials: true})
  }

  public agregarMiembroGrupo = (info) => {
    return this.http.post(this.miembroUrl + '/agregar-miembro-grupo', info, {observe: 'response', withCredentials: true})
  }

  public cambiarMiembroGrupo = (info) => {
    return this.http.post(this.miembroUrl + '/cambio-de-grupo', info, {observe: 'response', withCredentials: true})
  }

  public modificarAsesor = (info) => {
    return this.http.post(this.miembroUrl + '/modificar-asesor', info, {observe: 'response', withCredentials: true})
  }


  
}
