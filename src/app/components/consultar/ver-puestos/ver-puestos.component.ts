import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { MiembroService } from '../../../services/miembros/miembro.service'
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


  constructor(private router: Router,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) {
    miembroService.getUnMiembroxID(this.movimiento, this.ced).subscribe(res =>{
      console.log(res)
    })

  }

  ngOnInit(): void {
  }

}
