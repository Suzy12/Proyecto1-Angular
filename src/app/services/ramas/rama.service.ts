import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RamaService {
  private ramaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getRama = (idZona)  =>  {
    let params = {idZona: idZona};
    return this.http.post(this.ramaUrl + '/consultar-ramas', params, { observe: 'response' })
  }

  public crearRama = (ramaInfo)  => {
    return this.http.post(this.ramaUrl + '/crear-rama', ramaInfo, { observe: 'response' })
  }

  public consultarMiembrosRama = (idZona, idRama)  => {
    let params = {idZona: idZona, idRama: idRama};
    return this.http.post(this.ramaUrl + '/consultar-miembros-rama', params, { observe: 'response' })
  }

  
}
