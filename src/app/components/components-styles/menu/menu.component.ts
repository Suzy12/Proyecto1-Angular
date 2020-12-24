import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MiembroService } from '../../../services/miembros/miembro.service'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class MenuComponent implements OnInit {

  menus = [];
  usuario: any = {};
  rol = "";

  constructor(public sidebarservice: SidebarService,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router,) {
    let numero_rol =  this.storage.get('current-user-role');;
    this.menus = sidebarservice.getMenuList(numero_rol);
  }

  ngOnInit() {
    //Get rol del usuario loggeado
    this.rol = this.storage.get('current-user-role-name');
    //Get nombre del usuario loggeado
    let movimiento = this.storage.get('current-user-movimiento');
    let id = this.storage.get('current-user');
    setTimeout(() => {
      this.miembroService.getUnMiembroxID(movimiento, id).subscribe(
        res => {
          let usuarioTemp: any = res.body;

          if (usuarioTemp.success == true)
            this.usuario = usuarioTemp.miembro;

        }
      );
    }, 500);
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState(); //get estado: si es seleccionado
  }


  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

}
