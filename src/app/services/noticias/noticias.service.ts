import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiasUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public crearNoticia = (noticiaInfo)  =>  {
    return this.http.post(this.noticiasUrl + '/crear-noticia', noticiaInfo, { observe: 'response' })
  }

  public consultarNoticia = (idMovimiento, idMiembro)  =>  {
    let params = { idMovimiento: idMovimiento, idMiembro: idMiembro}
    console.log(params);
    return this.http.post(this.noticiasUrl + '/consultar-noticias-miembro', params, { observe: 'response' })
  }

  public consultarNoticiaAsesor = (idMovimiento, idMiembro)  =>  {
    let params = { idMovimiento: idMovimiento, idMiembro: idMiembro}
    console.log(params);
    return this.http.post(this.noticiasUrl + '/consultar-noticias-asesor', params, { observe: 'response' })
  }

  public leerNoticia = (idNoticia, idMiembro)  =>  {
    let params = { idNoticia: idNoticia, idMiembro: idMiembro}
    console.log(params);
    return this.http.post(this.noticiasUrl + '/leer-noticia', params, { observe: 'response' })
  }

  public getImagenesNoticia = (idNoticia)  =>  {
    let params = { idNoticia: idNoticia }
    console.log(params);
    return this.http.post(this.noticiasUrl + '/get-imagenes-noticia', params, { observe: 'response' })
  }

}
