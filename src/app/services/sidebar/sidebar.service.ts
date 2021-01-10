import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*Reference: https://github.com/azouaoui-med/angular-pro-sidebar*/

/*
La fachada se ve mediante el "rol", el cual se define por el nivel jerárquico del usuario
Se tiene la siguiente jerarquía:
1 - Miembro
2 - Monitor
3 - Jefe de Grupo
4 - Jefe de Rama 
5 - Jefe de Zona
6 - Asesor*

*Asesor no existe en este componente

Se puede acceder cualquier componente que pertenezca a un rol menor
*/

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
          title: 'Consultar la composición de las rama(s) y zona(s) que lidero',
          ruta: 'consultar/composicion-rama-zona',
          rol: '2'
        },
        {
          title: 'Consultar la composición de los grupo(s) que lidero',
          ruta: 'consultar/composicion-grupos-lider',
          rol: '2'
        },
        {
          title: 'Consultar la composición de los grupo(s) a los que pertenezco',
          ruta: 'consultar/composicion-grupos',
          rol: '1'
        },
        {
          title: 'Consultar grupo en particular',
          ruta: 'consultar/grupo',
          rol: '2'
        },
        {
          title: 'Consultar miembros de cualquier grupo, rama o zona',
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
          title: 'Consultar mis aportes',
          ruta: 'consultar/aportes',
          rol: '5'
        },
        {
          title: 'Consultar mis noticias',
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
      icon: 'fa fa-trash',
      active: false,
      type: 'simple',
      ruta: 'consultar/aportes',
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
    if (rol >= "5") {
      return this.menu;
    }
    return this.generarMenuxRol(rol);
  }

  generarMenuxRol(rol) {
    var menuRol: any = [];
    this.menu.forEach(element => {
      if (element.type === 'dropdown') {
        var submenu = [];
        element.submenus.forEach(e => {
          if (e.rol <= rol) {
            submenu.push(e);
            //console.log(e);
          }
        });
        if (submenu.length > 0) {
          var nuevoElement = JSON.parse(JSON.stringify(element))
          nuevoElement.submenus = submenu;
          menuRol.push(nuevoElement);
        }
      } else {
        if (element.rol <= rol) {
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
