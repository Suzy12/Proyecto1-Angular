import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AportesService {

  private aporteUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public enviarAporte = (tipo, contenido, idEmisor, idMovimiento)  => {
    let params = {tipo: tipo, contenido: contenido, idEmisor: idEmisor, idMovimiento: idMovimiento}
    return this.http.post(this.aporteUrl + '/crear-aporte', params, { observe: 'response' })
  }
}
