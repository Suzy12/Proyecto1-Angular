import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { ToastrService } from 'ngx-toastr';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'app-consultar-info-miembro',
  templateUrl: './consultar-info-miembro.component.html',
  styleUrls: ['./consultar-info-miembro.component.scss']
})
export class ConsultarInfoMiembroComponent implements OnInit {

  routeState: any;
  miembro: any;
  gruposMiembro: any = [];
  disable: Boolean = false;
  movimiento = this.storage.get('current-user-movimiento');

  constructor(private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log(this.routeState);
        this.miembro = this.routeState.miembro;
        let name = this.storage.get('current-user');
        if (name != this.miembro.id) {
          this.disable = true; 
          this.gruposMiembro = this.routeState.grupos;
          Object.values(this.gruposMiembro).forEach((element, index) => {
            let grupo: any = element;
            this.getNombreZona(grupo.id_zona + "", index);
          });
          Object.values(this.gruposMiembro).forEach((element, index) => {
            let grupo: any = element;
            this.getNombreRama(grupo.id_zona + "", grupo.id_rama + "", index);
          });
        }
      }
    }
  }

  getNombreZona(zona, i) {
    this.zonaService.getUnaZona(this.movimiento, zona).subscribe(
      res => {
        let zonaTemp: any = res.body;
        if (zonaTemp.success == false) {
          this.toastr.error(zonaTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          let zonaResult = zonaTemp.zona;
          this.gruposMiembro[i].id_zona = zonaResult.nombre;
        }
      }
    );
  }

  getNombreRama(zona, rama, i) {
    this.ramaService.getUnaRama(this.movimiento, zona, rama).subscribe(
      res => {
        let ramaTemp: any = res.body;
        if (ramaTemp.success == false) {
          this.toastr.error(ramaTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          let ramaResult = ramaTemp.rama;
          this.gruposMiembro[i].id_rama = ramaResult.nombre;
        }
      }
    );
  }





  modificarMiembro() {
    this.router.navigate(['/modificar/info-miembro'], { state: this.miembro })
  }

  ngOnInit(): void {
  }

}
