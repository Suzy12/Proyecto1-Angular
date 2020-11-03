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


}
