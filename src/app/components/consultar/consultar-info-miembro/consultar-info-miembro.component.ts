import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-info-miembro',
  templateUrl: './consultar-info-miembro.component.html',
  styleUrls: ['./consultar-info-miembro.component.scss']
})
export class ConsultarInfoMiembroComponent implements OnInit {

  routeState: any;
  miembro: any;
  gruposMiembro: any;
  nombreZona: any;

  constructor(private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private toastr: ToastrService
    ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log(this.routeState);
        this.miembro = this.routeState.miembro;
        this.gruposMiembro = this.routeState.grupos;
        console.log(this.gruposMiembro[0].id_zona);
        this.getNombreZona(this.gruposMiembro[0].id_zona+"");
        Object.values(this.gruposMiembro).forEach((element, index) => {
          let grupo:any = element;
          this.getNombreRama(this.gruposMiembro[0].id_zona+"", grupo.id_rama+"", index);
        });
      }
    }
  }

  getNombreZona(zona){
    this.zonaService.getUnaZona(zona).subscribe(
      res => {
        let zonaTemp: any = res.body;
        if(zonaTemp.success == false){
          this.toastr.error(zonaTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          let zonaResult = zonaTemp.zona;
          this.nombreZona = zonaResult.nombre;
        }
      }
    );
  }
  
  getNombreRama(zona, rama, i){
    this.ramaService.getUnaRama(zona, rama).subscribe(
      res => {
        let ramaTemp: any = res.body;
        if(ramaTemp.success == false){
          this.toastr.error(ramaTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          let ramaResult = ramaTemp.rama;
          this.gruposMiembro[i].id_zona = this.nombreZona;
          this.gruposMiembro[i].id_rama = ramaResult.nombre;
        }
      }
    );
  }

  

  

  modificarMiembro(){
    this.router.navigate(['/modificar/info-miembro'],  { state: this.miembro  }) 
  }

  ngOnInit(): void {
  }

}
