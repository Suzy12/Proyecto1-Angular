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

  public limpiarBandejaAportes = (idMovimiento)  => {
    let params = {idMovimiento: idMovimiento}
    return this.http.post(this.aporteUrl + '/limpiar-aportes', params, { observe: 'response' })
  }

  public consultarAportes = (idMovimiento)  => {
    let params = {idMovimiento: idMovimiento}
    return this.http.post(this.aporteUrl + '/get-aportes', params, { observe: 'response' })
  }

  public generarReporteTipado = (idMovimiento, idEmisor)  => {
    let params = {idMovimiento: idMovimiento, idEmisor: idEmisor}
    return this.http.post(this.aporteUrl + '/get-reporte-tipado', params, { observe: 'response' })
  }

  public generarReporteGeneral = (idMovimiento, idEmisor)  => {
    let params = {idMovimiento: idMovimiento, idEmisor: idEmisor}
    return this.http.post(this.aporteUrl + '/get-reporte', params, { observe: 'response' })
  }

}
