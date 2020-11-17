import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private movimientoUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getMovimiento = (idMovimiento)  =>  {
    let params = {idMovimiento: idMovimiento};
    return this.http.post(this.movimientoUrl + '/get-movimiento', params, { observe: 'response', withCredentials: true })
  }

  public modificarMovimiento = (infoMovimiento)  =>  {
    return this.http.post(this.movimientoUrl + '/modificar-movimiento', infoMovimiento, { observe: 'response', withCredentials: true })
  }
  

  public getSession = ()  =>  {
    return this.http.get(this.movimientoUrl + '/showSession', { observe: 'response', withCredentials: true })
  }

  public crearMovimiento = (infoMovimiento)  =>  {
    return this.http.post(this.movimientoUrl + '/crear-movimiento', infoMovimiento, { observe: 'response', withCredentials: true })
  }

  public crearEstructuraMovimiento = (infoMovimiento)  =>  {
    return this.http.post(this.movimientoUrl + '/iniciar-estructura-movimiento', infoMovimiento, { observe: 'response', withCredentials: true })
  }


}
