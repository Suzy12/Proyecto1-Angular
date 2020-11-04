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

  movimiento: any;

  constructor(
    private router: Router,
    private miembroService: MiembroService,
    private movimientoService: MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovimiento();
  }

  getMovimiento(){
    this.movimientoService.getMovimiento("4000042145").subscribe(
      res => {
        let movimientoTemp:any = res.body;
        if(movimientoTemp.success == false){
          this.toastr.error(movimientoTemp.error.message, 'Error', {timeOut: 5000});
          console.log("Error");
        }else{
          this.movimiento = movimientoTemp.movimiento;
          console.log(this.movimiento.idAsesor);
          this.miembroService.getUnMiembro(this.movimiento.idAsesor).subscribe(
            res =>{
              console.log(res.body);
            }
          );
          console.log(this.movimiento);

        } 
      },
      err => console.log(err)
    );

  }

}
