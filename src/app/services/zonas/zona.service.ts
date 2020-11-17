import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private zonaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllZonas = ()  => {
    return this.http.get(this.zonaUrl + '/consultar-zonas', { observe: 'response' })
  }

  public getUnaZona = (idZona)  => {
    let params = {idZona: idZona};
    console.log(params);
    return this.http.post(this.zonaUrl + '/get-zona' , params, { observe: 'response', withCredentials: true })
  }

  public crearZona = (zonaInfo)  => {
    return this.http.post(this.zonaUrl + '/crear-zona', zonaInfo, { observe: 'response', withCredentials: true })
  }
  
  public consultarMiembrosZona = (idZona)  => {
    let params = {idZona: idZona};
    return this.http.post(this.zonaUrl + '/consultar-miembros-zona', params, { observe: 'response', withCredentials: true })
  }

  public modificarZona = (zonaInfo)  => {
    return this.http.post(this.zonaUrl + '/modificar-zona', zonaInfo, { observe: 'response', withCredentials: true })
  }
  
}
