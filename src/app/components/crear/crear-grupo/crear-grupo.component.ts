import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { GrupoService } from '../../../services/grupos/grupo.service'
import { ToastrService } from 'ngx-toastr';
import { MiembroService } from '../../../services/miembros/miembro.service'

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit {


  zonas: any = [];
  ramas: any = [];
  monitores: any = [];
  selectedOptionZona: any;
  grupoForm: FormGroup;
  grupo:any = {};
  submitted: Boolean = false;
  encargado1: any = false;
  encargado2: any = false;
  movimiento = this.storage.get('current-user-movimiento');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getZonas();
    this.grupoForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      idEncargado1: ['', [Validators.required]],
      idEncargado2: ['Ninguno', [Validators.required]],
      isMonitor: true
    });
  }

  get form() { return this.grupoForm.controls }

  public getZonas() {
    this.zonaService.getAllZonas(this.movimiento).subscribe(
      res => {
        let zonasTemp: any = res.body;
        if (zonasTemp.success == false) {
          this.toastr.error(zonasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {

          Object.values(zonasTemp.zonas).forEach(element => {
            this.zonas.push(element);
          });
        }
      },
      err => console.log(err)
    );
  }

  getRamas(newZona) {
    this.ramas = [];
    this.ramaService.getRamas(this.movimiento, newZona).subscribe(
      res => {
        let ramasTemp: any = res.body;
        if (ramasTemp.success == false) {
          this.toastr.error(ramasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {

          Object.values(ramasTemp.ramas).forEach(element => {
            this.ramas.push(element);
          });
        }
      },
      err => console.log(err)
    )
    this.getMonitores(newZona);
  }

  getMonitores(idZona) {
    this.monitores = [];
    this.miembroService.getAllMonitores(this.movimiento, idZona).subscribe(
      res => {
        let monitoresTemp: any = res.body;
        if (monitoresTemp.success == false) {
          this.toastr.error(monitoresTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(monitoresTemp.monitores);
          Object.values(monitoresTemp.monitores).forEach(element => {
            this.monitores.push(element);
          });
        }
      },
      err => console.log(err)
    )
  }

  changeEncargado1(id) {
    if (this.encargado2.cedula == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });
      this.encargado2 = false;
      this.grupoForm.controls['idEncargado2'].setValue('Ninguno');
    }
    for (let encargado of this.monitores) {
      if (encargado.cedula == id) {
        this.encargado1 = encargado;
      }
    }
  }

  changeEncargado2(id) {
    if (this.encargado1.cedula == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });
      this.grupoForm.controls['idEncargado2'].setValue('Ninguno');
    }else{
      for (let encargado of this.monitores) {
        if (encargado.cedula == id) {
          this.encargado2 = encargado;
        }
      }
    }
  }

  crearGrupo(){
    let grupoInfo = this.grupoForm.getRawValue();

    this.submitted = true;

    console.log(grupoInfo);

    if (this.grupoForm.invalid) return;


    if(grupoInfo.idEncargado2 == "Ninguno"){
      delete grupoInfo['idEncargado2'];
    }

    console.log(grupoInfo);

    this.grupoService.crearGrupo(grupoInfo).subscribe(res => {
      console.log(res.body);
      this.responseController(res);
    }, error => console.log(error))
    
    this.submitted = false;
  }

  responseController = (res) => {
    this.toastr.clear();
    if(res.body.success == false){
      this.toastr.error(res.body.error.message, 'Error', {timeOut: 5000});
      console.log("Error");
    }else{
      this.toastr.success("La solicitud se realizó con éxito", 'Grupo Creado', {timeOut: 2000});
      console.log("Éxito");
      this.grupoForm.reset();
      this.grupoForm.controls['idEncargado2'].setValue('Ninguno');
      this.grupoForm.controls['isMonitor'].setValue(true);
      this.grupoForm.controls['idMovimiento'].setValue(this.movimiento);

    }
  }


}
