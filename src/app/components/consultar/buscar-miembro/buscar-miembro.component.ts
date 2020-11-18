import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MiembroService } from '../../../services/miembros/miembro.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-miembro',
  templateUrl: './buscar-miembro.component.html',
  styleUrls: ['./buscar-miembro.component.scss']
})
export class BuscarMiembroComponent implements OnInit {

  idMiembro:any = '';
  miembroIdForm: FormGroup;
  movimiento = this.storage.get('current-user-movimiento');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.miembroIdForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idMiembro: ['', [Validators.required]]
   });
  }

  consultarMiembro = () => {
    let miembroInfo = this.miembroIdForm.getRawValue();

    if (this.miembroIdForm.invalid) return;

    this.miembroService.getUnMiembro(miembroInfo).subscribe(res => {
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
      this.router.navigate(['/consultar/info-miembro'],  { state: res.body  })  
    }
  }

}
