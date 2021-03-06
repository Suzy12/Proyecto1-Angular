import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { MiembroService } from '../../../services/miembros/miembro.service'
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { MovimientoService } from '../../../services/movimientos/movimiento.service'
import { ToastrService } from 'ngx-toastr';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'app-ver-puestos',
  templateUrl: './ver-puestos.component.html',
  styleUrls: ['./ver-puestos.component.scss']
})
export class VerPuestosComponent implements OnInit {
  routeState: any;
  gruposMiembro: any = [];
  movimiento = this.storage.get('current-user-movimiento');
  ced = this.storage.get('current-user');
  headElements = ["Movimiento", "Zona", "Rama", "Grupo", "Rol"];
  nombreMovimiento = this.storage.get('current-movement');


  constructor(private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private miembroService: MiembroService,
    private movimientoService : MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) {

  }

    //=============Get Info de una zona===============
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
  
    //=============Get info de una rama===============
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

    //=============Get info de un movimiento===============
    getNombreMovimiento() {
      this.movimientoService.getMovimiento(this.movimiento).subscribe(
        res => {
          let movTemp: any = res.body;
          if (movTemp.success == false) {
            this.toastr.error(movTemp.error.message, 'Error', { timeOut: 5000 });
            console.log("Error");
          } else {
            console.log(movTemp)
            let movResult = movTemp.movimiento;
            console.log(movResult.nombre);
            this.nombreMovimiento = movResult.nombre;
          }
        }
      );
    }

  ngOnInit(): void {
    this.miembroService.getUnMiembroxID(this.movimiento, this.ced).subscribe(res =>{
      console.log(res.body);
      this.routeState = res.body;
      this.gruposMiembro = this.routeState.grupos;  //Retorna solo del movimiento actual
      Object.values(this.gruposMiembro).forEach((element, index) => {
        let grupo: any = element;
        this.getNombreZona(grupo.id_zona + "", index); //Get la zona del grupo actual
        this.getNombreRama(grupo.id_zona + "", grupo.id_rama + "", index); //get la rama del grupo actual
      });
    })
  }

}
