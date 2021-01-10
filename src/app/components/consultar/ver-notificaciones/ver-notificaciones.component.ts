import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../../../services/noticias/noticias.service';
import { MiembroService } from '../../../services/miembros/miembro.service';
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { GrupoService } from '../../../services/grupos/grupo.service'


@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.scss'],

})
export class VerNotificacionesComponent implements OnInit {

  closeResult: string;
  noticias = [];
  movimiento = this.storage.get('current-user-movimiento');
  miembro = this.storage.get('current-user');
  rol = this.storage.get('current-user-role');
  noticiaActual: any = false;
  notMiembro = true;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    @Inject(SESSION_STORAGE) public storage: StorageService,
    private toastr: ToastrService,
    private noticiasService: NoticiasService,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
  ) { }

  ngOnInit(): void {
    if(this.rol== "1") this.notMiembro = false;
    if (this.rol == "6") {
      this.noticiasService.consultarNoticiaAsesor(this.movimiento, this.miembro).subscribe(
        res => {
          this.response(res);
        },
        err => console.log(err)
      );

    } else {
      this.noticiasService.consultarNoticia(this.movimiento, this.miembro).subscribe(
        res => {
          this.response(res);
        },
        err => console.log(err)
      );
    }
  }

  response(res) {
    let noticiasTemp: any = res.body;
    if (noticiasTemp.success == false) {
      this.toastr.error(noticiasTemp.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      console.log(noticiasTemp.noticias);
      Object.values(noticiasTemp.noticias).reverse().forEach((element, index) => {
        Object.values(element).forEach(e => {
          this.noticias.push(e);
          let noticia: any = e;
          this.getNombreZona(noticia.id_zona + "", index);
          this.getNombreRama(noticia.id_zona + "", noticia.id_rama + "", index);
          this.getNombreGrupo(noticia.id_zona + "", noticia.id_rama + "", noticia.id_grupo + "", index);
          this.getNombreMiembro(noticia.id_miembro, index);
          this.noticias[index].imagenes = false;
        })
      });
    }
  }

  getImagenesNoticia(idNoticia, i) {
    this.noticiasService.getImagenesNoticia(idNoticia)
      .toPromise()
      .then(
        res => { // Success
          let imagenesTemp: any = res.body;
          if (imagenesTemp.success == true && imagenesTemp.imagenes.length > 0) {
            console.log(imagenesTemp);
            let images = [];
            Object.values(imagenesTemp.imagenes).forEach(e => {
              let img: any = e;
              images.push(img.imagen);
            })
            this.noticias[i].imagenes = images;
            console.log(this.noticias[i]);
          }
        },
        msg => {
          console.log(msg);
        }
      );

  }

  //=============Get Info de una zona===============
  getNombreZona(zona, i) {
    this.zonaService.getUnaZona(this.movimiento, zona).subscribe(
      res => {
        let zonaTemp: any = res.body;
        if (zonaTemp.success == true) {
          let zonaResult = zonaTemp.zona;
          this.noticias[i].id_zona = zonaResult.nombre;
        }
      }
    );
  }

  //=============Get info de una rama===============
  getNombreRama(zona, rama, i) {
    this.ramaService.getUnaRama(this.movimiento, zona, rama).subscribe(
      res => {
        let ramaTemp: any = res.body;
        if (ramaTemp.success == true) {
          let ramaResult = ramaTemp.rama;
          this.noticias[i].id_rama = ramaResult.nombre;
        }
      }
    );
  }

  //=============Consultar grupo seleccionado===============
  getNombreGrupo(idZona, idRama, idGrupo, i) {
    let grupoInfo = { idMovimiento: this.movimiento, idZona: idZona, idRama: idRama, idGrupo: idGrupo };
    this.grupoService.getUnGrupo(grupoInfo).subscribe(res => {
      console.log(res);
      let result: any = res.body;
      if (result.success == true) {
        let grupoTemp: any = result.grupo;
        this.noticias[i].id_grupo = grupoTemp.nombre;
      }
    }, error => console.log(error))
  }

  getNombreMiembro(id, i) {
    this.miembroService.getUnMiembroxID(this.movimiento, id).subscribe(
      res => {
        let usuarioTemp: any = res.body;
        if (usuarioTemp.success == true)
          this.noticias[i].id_miembro = usuarioTemp.miembro.nombre;
          this.noticias[i].email = usuarioTemp.miembro.email;
      }
    );
  }

  getClass(i) {
    if (this.noticias[i].leido) {
      return 'message';
    } else {
      return 'message unread';
    }
  }

  /* --------------------------------------------- */
  /* Modal Notificaciones */

  openScrollableContent(longContent, i) {
    if(!this.noticias[i].imagenes) this.getImagenesNoticia(this.noticias[i].id_noticia, i);
    this.noticiaActual = this.noticias[i];
    if (!this.noticias[i].leido) {
      this.noticias[i].leido = true;
      let count = this.storage.get('current-user-notifications');
      if (this.rol == "6") {
        this.noticiasService.leerNoticiaAsesor(this.noticias[i].id_noticia, this.miembro).subscribe(
          res => {
            let response: any = res.body;
            if (response.success == true) {
              count--;
              this.storage.set('current-user-notifications', count);
            }
          }
        );
      }else{
        this.noticiasService.leerNoticia(this.noticias[i].id_noticia, this.miembro).subscribe(
          res => {
            let response: any = res.body;
            if (response.success == true) {
              count--;
              this.storage.set('current-user-notifications', count);
            }
          }
        );
      }
    }
    this.modalService.open(longContent, { centered: true, scrollable: true, size: 'lg' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  goToCrearNoticia(){
    this.router.navigate(['/crear/noticia']); //navegar a la pagina de perfil 
  }
}
