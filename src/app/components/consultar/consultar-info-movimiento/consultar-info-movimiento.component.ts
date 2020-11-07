import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MovimientoService } from '../../../services/movimientos/movimiento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-info-movimiento',
  templateUrl: './consultar-info-movimiento.component.html',
  styleUrls: ['./consultar-info-movimiento.component.scss']
})
export class ConsultarInfoMovimientoComponent implements OnInit {

  movimiento: any = {};
  telefonos: any = [];

  constructor(private router: Router,
    private movimientoService: MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovimiento();
  }

  getMovimiento() {
    this.movimientoService.getMovimiento("4000042145").subscribe(
      res => {
        let movimientoTemp: any = res.body;
        if (movimientoTemp.success == false) {
          this.toastr.error(movimientoTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.movimiento = movimientoTemp.movimiento;
          console.log(this.movimiento);
          Object.values(this.movimiento.telefonos).forEach(element => {
            this.telefonos.push(element);
          });

        }
      },
      err => console.log(err)
    );
  }

  modificarMovimiento(){
    this.router.navigate(['/modificar/movimiento'],  { state: this.movimiento  }) 
  }

}
