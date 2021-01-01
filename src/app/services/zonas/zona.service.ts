import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private zonaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllZonas = (idMovimiento)  => {
    let params = {idMovimiento: idMovimiento}
    return this.http.post(this.zonaUrl + '/consultar-zonas', params, { observe: 'response' })
  }

  public getUnaZona = (idMovimiento, idZona)  => {
    let params = {idMovimiento: idMovimiento, idZona: idZona};
    console.log(params);
    return this.http.post(this.zonaUrl + '/get-zona' , params, { observe: 'response' })
  }

  public crearZona = (zonaInfo)  => {
    return this.http.post(this.zonaUrl + '/crear-zona', zonaInfo, { observe: 'response' })
  }
  
  public consultarMiembrosZona = (idMovimiento, idZona)  => {
    let params = {idMovimiento: idMovimiento, idZona: idZona};
    return this.http.post(this.zonaUrl + '/consultar-miembros-zona', params, { observe: 'response'})
  }

  public modificarZona = (zonaInfo)  => {
    return this.http.post(this.zonaUrl + '/modificar-zona', zonaInfo, { observe: 'response' })
  }

  public zonasMiembro = (idMovimiento, idMiembro)  => {
    let params = {idMovimiento: idMovimiento, idMiembro: idMiembro};
    return this.http.post(this.zonaUrl + '/consultar-zonas-miembro', params, { observe: 'response' })
  }
  
  public zonasLider = (idMovimiento, idMiembro)  => {
    let params = {idMovimiento: idMovimiento, idMiembro: idMiembro};
    return this.http.post(this.zonaUrl + '/consultar-zonas-lider', params, { observe: 'response' })
  }
}
