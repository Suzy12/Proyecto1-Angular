import { Component, OnInit, Inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../../../services/noticias/noticias.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  counter = 0;
  showAportes = false;
  rol = this.storage.get('current-user-role');
  movimiento = this.storage.get('current-user-movimiento');
  miembro = this.storage.get('current-user');
  countNotificaciones = 0;

  constructor(public sidebarservice: SidebarService,
    @Inject(SESSION_STORAGE) public storage: StorageService,
    private toastr: ToastrService,
    private noticiasService: NoticiasService,
  ) { }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {
    if (this.rol >= "5") {
      this.showAportes = true;
    }
    this.notificaciones();
    this.counter = this.storage.get('current-user-notifications');
  }

  getClass() {
    if (this.rol >= "5") {
      return "navbar-nav d-flex justify-content-end notifications"; 
    } else {
      return "navbar-nav ml-auto d-flex justify-content-end notifications";
    }
  }

  cerrarSesion(){
    this.storage.clear();
  }

  notificaciones() {
    let rol = this.storage.get('current-user-role');
    if (rol == "6") {
      this.noticiasService.consultarNoticiaAsesor(this.movimiento, this.miembro)
        .toPromise()
        .then(
          res => { // Success
            this.response(res);
            this.storage.set('current-user-notifications', this.countNotificaciones);
          },
          msg => {
            console.log(msg);
          }
        );
    } else {
      this.noticiasService.consultarNoticia(this.movimiento, this.miembro)
        .toPromise()
        .then(
          res => { // Success
            this.response(res);
            this.storage.set('current-user-notifications', this.countNotificaciones);
          },
          msg => {
            console.log(msg);
          }
        );
    }
  }

  response(res) {
    let noticiasTemp: any = res.body;
    if (noticiasTemp.success == false) {
      this.toastr.error(noticiasTemp.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      Object.values(noticiasTemp.noticias).forEach(element => {
        Object.values(element).forEach(e => {
          let noticia: any = e;
          if (!noticia.leido) {
            this.countNotificaciones += 1;
          }
        })
      });
    }
  }

}
