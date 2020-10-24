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
      submenus: [
        {
          title: 'Crear Miembro',
        },
        {
          title: 'Crear Grupo'
        },
        {
          title: 'Crear Zona/Rama'
        }
      ]
    },
    {
      title: 'Consultar',
      icon: 'fa fa-search',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Consultar grupo en particular',
        },
        {
          title: 'Consultar miembro en particular'
        },
        {
          title: 'Ver miembros'
        }
      ]
    },
    {
      title: 'Modificar',
      icon: 'fa fa-pencil',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Modificar Zona',
        },
        {
          title: 'Modificar Rama'
        },
        {
          title: 'Modificar Grupo'
        },
        {
          title: 'Modificar Miembro'
        },
        {
          title: 'Modificar Movimiento'
        }
      ]
    },
    {
      title: 'Agregar miembro a grupo',
      icon: 'fa fa-plus-circle',
      active: false,
      type: 'simple',
    },
    {
      title: 'Cambiar miembro de grupo',
      icon: 'fa fa-exchange',
      active: false,
      type: 'simple'
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
