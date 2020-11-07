import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-consultar-info-miembro',
  templateUrl: './consultar-info-miembro.component.html',
  styleUrls: ['./consultar-info-miembro.component.scss']
})
export class ConsultarInfoMiembroComponent implements OnInit {

  routeState: any;
  miembro: any;
  gruposMiembro: any;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log(this.routeState);
        this.miembro = this.routeState.miembro;
        this.gruposMiembro = this.routeState.grupos;
      }
    }
  }

  

  modificarMiembro(){
    this.router.navigate(['/modificar/info-miembro'],  { state: this.miembro  }) 
  }

  ngOnInit(): void {
  }

}
