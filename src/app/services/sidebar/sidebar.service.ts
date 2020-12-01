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
          title: 'Crear Zona/Rama',
          ruta: 'crear/zona-rama'
        },
        {
          title: 'Crear Grupo',
          ruta: 'crear/grupo'
        },
        {
          title: 'Crear Miembro',
          ruta: 'crear/miembro'
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
          ruta: 'consultar/movimiento'
        },
        {
          title: 'Consultar grupo en particular',
          ruta: 'consultar/grupo'
        },
        {
          title: 'Consultar miembros',
          ruta: 'consultar/miembros'
        },
        {
          title: 'Consultar miembro en particular',
          ruta: 'consultar/buscar'
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
          title: 'Modificar Movimiento',
          ruta: 'consultar/movimiento'
        },
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
          ruta: 'consultar/buscar'
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
    this.toggled = !this.toggled;
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
