import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MiembroService } from '../../../services/miembros/miembro.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-perfil',
  templateUrl: './consultar-perfil.component.html',
  styleUrls: ['./consultar-perfil.component.scss']
})
export class ConsultarPerfilComponent implements OnInit {

  miembro: any = {};
  movimiento = this.storage.get('current-user-movimiento');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    let id = this.storage.get('current-user');
    this.miembroService.getUnMiembroxID(this.movimiento, id).subscribe(res => {
      this.resController(res);
    }, error => console.log(error))
  }

  resController = (res) => {
    this.toastr.clear();
    if(res.body.success == false){
      this.toastr.error(res.body.error.message, 'Error', {timeOut: 5000});
      console.log("Error");
    }else{  
      console.log(res); 
      this.miembro = res.body.miembro;    
    }
  }

  modificarMiembro() {
    this.router.navigate(['/editar-perfil'], { state: this.miembro })
  }

}
