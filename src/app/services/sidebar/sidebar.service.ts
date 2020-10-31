import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled: boolean = false;
  menus = [
    {
      title: 'Crear',
      icon: 'fa fa-plus',
      active: false,
      type: 'dropdown',
      ruta: '',
      submenus: [
        {
          title: 'Crear Miembro',
          ruta: 'crear/miembro'
        },
        {
          title: 'Crear Grupo',
          ruta: 'crear/grupo'
        },
        {
          title: 'Crear Zona/Rama',
          ruta: 'crear/zona-rama'
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
          title: 'Consultar grupo en particular',
          ruta: 'consultar/grupo'
        },
        {
          title: 'Consultar miembro en particular',
          ruta: 'consultar/buscar'
        },
        {
          title: 'Ver miembros',
          ruta: 'consultar/miembros'
        }
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
          title: 'Modificar Zona',
          ruta: 'modificar/zona'
        },
        {
          title: 'Modificar Rama',
          ruta: 'modificar/rama'
        },
        {
          title: 'Modificar Grupo',
          ruta: 'modificar/grupo'
        },
        {
          title: 'Modificar Miembro',
          ruta: 'modificar/info-miembro'
        },
        {
          title: 'Modificar Movimiento',
          ruta: 'modificar/movimiento'
        }
      ]
    },
    {
      title: 'Agregar miembro a grupo',
      icon: 'fa fa-plus-circle',
      active: false,
      type: 'simple',
      ruta: 'agregar-miembro-grupo'
    },
    {
      title: 'Cambiar miembro de grupo',
      icon: 'fa fa-exchange',
      active: false,
      type: 'simple',
      ruta: 'cambiar-miembro-grupo'      
    },
  ];
  constructor() { }
  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

}
