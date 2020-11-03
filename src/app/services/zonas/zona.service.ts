import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private zonaUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllZonas = ()  => {
    return this.http.get(this.zonaUrl + '/consultar-zonas', { observe: 'response' })
  }
  
}
