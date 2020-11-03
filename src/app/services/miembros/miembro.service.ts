import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  private miembroUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUnMiembro = (idMiembro)  =>  {
    return this.http.post(this.miembroUrl + '/get-miembro', idMiembro, { observe: 'response' })
  }

  public modificarInfoMiembro = (infoMiembro) => {
    return this.http.post(this.miembroUrl + '/modificar-miembro', infoMiembro, {observe: 'response'})
  }
}
