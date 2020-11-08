import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { MiembroService } from '../../../services/miembros/miembro.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-info-miembro',
  templateUrl: './modificar-info-miembro.component.html',
  styleUrls: ['./modificar-info-miembro.component.scss']
})
export class ModificarInfoMiembroComponent implements OnInit {

  routeState: any;
  miembro: any;
  miembroForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private miembroService: MiembroService,
    private toastr: ToastrService
    ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log(this.routeState);
        this.miembro = this.routeState;
      }
    }
  }

  ngOnInit(): void {
    this.miembroForm = this.formBuilder.group({
      idMiembro: this.miembro.id,
      nombre: [this.miembro.nombre, [Validators.required]],
      celular: [this.miembro.celular, [Validators.required]],
      email: [this.miembro.email, [Validators.required]],
      provincia: [this.miembro.provincia, [Validators.required]],
      canton: [this.miembro.canton, [Validators.required]],
      distrito: [this.miembro.distrito, [Validators.required]],
      senas: [this.miembro.senas, [Validators.required]],
      posible_monitor: '',
      idZona: '1',
      idRama: '1',
      idGrupo: '1',
   });

  }

  get form() { return this.miembroForm.controls }

  modificar = () => {
    let miembroInfo = this.miembroForm.getRawValue();

    this.submitted = true;

    if (this.miembroForm.invalid) return;

    if(miembroInfo.posible_monitor == ''){
      miembroInfo.posible_monitor = this.miembro.posible_monitor;
    }else{
      miembroInfo.posible_monitor == 'No' ? miembroInfo.posible_monitor = false : miembroInfo.posible_monitor = true; 
    }
    console.log(miembroInfo);

   /*this.miembroService.modificarInfoMiembro(miembroInfo).subscribe(res => {
      console.log(res.body);
      this.consultarController(res);
    }, error => console.log(error))*/

    this.submitted = false;
  }

  consultarController = (res) => {
    this.toastr.clear();
    if(res.body.success == false){
      this.toastr.error(res.body.error.message, 'Error', {timeOut: 5000});
      console.log("Error");
    }else{
      this.toastr.success("La solicitud se realizó con éxito", 'Miembro modificado', {timeOut: 2000});
      console.log("Éxito");
    }
  }

}
