import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authUrl = environment.apiUrl + '/iniciar-sesion'
  constructor(private http: HttpClient) { }

  public login = (loginInfo) => {
    return this.http.post(this.authUrl, loginInfo, { observe: 'response', withCredentials: true })
  }
}
