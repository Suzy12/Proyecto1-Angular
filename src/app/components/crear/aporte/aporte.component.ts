import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { AportesService } from '../../../services/aportes/aportes.service'

@Component({
  selector: 'app-aporte',
  templateUrl: './aporte.component.html',
  styleUrls: ['./aporte.component.scss']
})
export class AporteComponent implements OnInit {
  tipos_aportes : any = ['Petitoria', 'Agradecimiento', 'Ofrecimiento'];
  aporteForm: FormGroup;
  submitted: Boolean = false;
  movimiento = this.storage.get('current-user-movimiento');
  ced = this.storage.get('current-user');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private aportesService: AportesService,
    private toastr: ToastrService) {
      
    }

  ngOnInit(): void {
    this.aporteForm = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
      idEmisor: this.ced,
      idMovimiento: this.movimiento
    });
  }

  get form() { return this.aporteForm.controls } //form de crear zona

  submitAporte(){
    let data = this.aporteForm.getRawValue();
    this.aportesService.enviarAporte(data.tipo, data.contenido, data.idEmisor, data.idMovimiento).subscribe(res=>{
      let temp: any = res.body;
      if(!res.body){
        this.toastr.error(temp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
      }
      else{
        this.toastr.success("Aporte enviado");
      }
    })
  }

}
