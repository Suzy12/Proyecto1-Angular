import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private grupoUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getGrupos = (idZona, idRama)  =>  {
    let params = {idZona: idZona, idRama: idRama};
    return this.http.post(this.grupoUrl + '/consultar-grupos', params, { observe: 'response' })
  }

  public getUnGrupo = (grupoInfo)  =>  {
    return this.http.post(this.grupoUrl + '/get-grupo', grupoInfo, { observe: 'response' })
  }

  public consultarMiembrosGrupo = (idZona, idRama, idGrupo)  =>  {
    let params = {idZona: idZona, idRama: idRama, idGrupo: idGrupo};
    return this.http.post(this.grupoUrl + '/consultar-miembros-grupo', params, { observe: 'response' })
  }

  public crearGrupo = (grupoInfo)  =>  {
    return this.http.post(this.grupoUrl + '/crear-grupo', grupoInfo, { observe: 'response' })
  }


}
