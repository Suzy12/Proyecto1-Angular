import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*Reference: https://github.com/azouaoui-med/angular-pro-sidebar*/

export class SidebarService {
  toggled: boolean = false;
  menu = [
    {
      title: 'Crear',
      icon: 'fa fa-plus',
      active: false,
      type: 'dropdown',
      ruta: '',
      submenus: [
        {
          title: 'Crear Zona/Rama',
          ruta: 'crear/zona-rama',
          rol: '5'
        },
        {
          title: 'Crear Grupo',
          ruta: 'crear/grupo',
          rol: '5'
        },
        {
          title: 'Crear Miembro',
          ruta: 'crear/miembro',
          rol: '5'
        },
        {
          title: 'Crear Reporte Mensual',
          ruta: 'crear/reporte',
          rol: '5'
        },
        {
          title: 'Crear Aporte',
          ruta: 'crear/aporte',
          rol: '1'
        },
        {
          title: 'Crear Noticia',
          ruta: 'crear/noticia',
          rol: '2'
        }
      ]
    },
    {
      title: 'Consultar',
      icon: 'fa fa-search',
      active: false,
      type: 'dropdown',
      ruta: '',
      submenus: [
        {
          title: 'Consultar información del movimiento',
          ruta: 'consultar/movimiento',
          rol: '1'
        },
        {
          title: 'Consultar la composición de mi(s) rama(s) y zona(s)',
          ruta: 'consultar/composicion-rama-zona',
          rol: '2'
        },
        {
          title: 'Consultar la composición de mi(s) grupo(s)',
          ruta: 'consultar/composicion-grupo',
          rol: '1'
        },
        {
          title: 'Consultar grupo en particular',
          ruta: 'consultar/grupo',
          rol: '2'
        },
        {
          title: 'Consultar miembros',
          ruta: 'consultar/miembros',
          rol: '2'
        },
        {
          title: 'Consultar miembro en particular',
          ruta: 'consultar/buscar',
          rol: '5'
        },
        {
          title: 'Consultar mis puestos en el movimiento',
          ruta: 'consultar/puestos',
          rol: '1'
        },
        {
          title: 'Consultar mis notificaciones',
          ruta: 'consultar/notificaciones',
          rol: '1'
        },
      ]
    },
    {
      title: 'Modificar',
      icon: 'fa fa-pencil',
      active: false,
      type: 'dropdown',
      ruta: '',
      submenus: [
        {
          title: 'Modificar Movimiento',
          ruta: 'consultar/movimiento',
          rol: '5'
        },
        {
          title: 'Modificar Zona',
          ruta: 'modificar/zona',
          rol: '5'
        },
        {
          title: 'Modificar Rama',
          ruta: 'modificar/rama',
          rol: '5'
        },
        {
          title: 'Modificar Grupo',
          ruta: 'modificar/grupo',
          rol: '5'
        },
        {
          title: 'Modificar Miembro',
          ruta: 'consultar/buscar',
          rol: '5'
        }
      ]
    },
    {
      title: 'Agregar miembro a grupo',
      icon: 'fa fa-plus-circle',
      active: false,
      type: 'simple',
      ruta: 'agregar-miembro-grupo',
      rol: '5'
    },
    {
      title: 'Cambiar miembro de grupo',
      icon: 'fa fa-exchange',
      active: false,
      type: 'simple',
      ruta: 'cambiar-miembro-grupo',
      rol: '5'
    },
    {
      title: 'Descargar bandeja de aportes',
      icon: 'fa fa-undo',
      active: false,
      type: 'simple',
      ruta: 'descargar-bandeja',
      rol: '5'
    },
  ];

  constructor() { }
  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList(rol) {
    if(rol >= "5"){
      return this.menu;
    }
    return this.generarMenuxRol(rol);
  }

  generarMenuxRol(rol){
    var menuRol: any = [];
    this.menu.forEach(element => {
      if (element.type === 'dropdown') {
        var submenu = [];
        element.submenus.forEach( e => {
          if(e.rol <= rol){
            submenu.push(e);
            //console.log(e);
          }    
        });
        if(submenu.length > 0){
          var nuevoElement = JSON.parse(JSON.stringify(element))
          nuevoElement.submenus = submenu;
          menuRol.push(nuevoElement);
        }      
      } else {
        if(element.rol <= rol){
          console.log(element);
          menuRol.push(element);
        } 
      }
    });
    console.log(menuRol);
    console.log(this.menu);
    return menuRol;
  }
}
