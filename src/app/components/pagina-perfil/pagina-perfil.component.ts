import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MiembroService } from '../../services/miembros/miembro.service'
import { MovimientoService } from '../../services/movimientos/movimiento.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.scss']
})
export class PaginaPerfilComponent implements OnInit {

  movimiento: any = {};
  asesor: any = {};
  rol = "";


  constructor(
    private router: Router,
    private miembroService: MiembroService,
    private movimientoService: MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.rol = this.storage.get('current-user-role-name');
    this.getMovimiento();
  }

  //=============Get Info del Movimiento Actual===============
  getMovimiento() {
    let movimiento = this.storage.get('current-user-movimiento');
    this.movimientoService.getMovimiento(movimiento).subscribe(
      res => {
        let movimientoTemp: any = res.body;
        if (movimientoTemp.success == false) {
          this.toastr.error(movimientoTemp.error.message, 'Error', { timeOut: 5000 });
          console.log(movimientoTemp);
        } else {
          this.movimiento = movimientoTemp.movimiento;
          this.storage.set('current-movement', this.movimiento.nombre);
        }
      },
      err => console.log(err)
    );

  }

}
