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
  selector: 'app-modificar-rama',
  templateUrl: './modificar-rama.component.html',
  styleUrls: ['./modificar-rama.component.scss']
})
export class ModificarRamaComponent implements OnInit {

  zonas: any = [];
  ramas: any = [];

  encargado1: any = false;
  encargado2: any = false;
  encargadoViejo1: any = false;
  encargadoViejo2: any = false;
  encargados: any = [];

  selectedOptionZona: any;
  selectedOptionRama: any;

  public show: boolean = false;
  ramaForm: FormGroup;
  ramaModificadaForm: FormGroup;
  rama: any = {};
  submitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getZonas();
    this.ramaForm = this.formBuilder.group({
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]]
    });
    this.ramaModificadaForm = this.formBuilder.group({
      idZona: this.selectedOptionZona,
      idRama: this.selectedOptionRama,
      nombre: '',
      idJefeNuevo1: [this.rama.encargado1, [Validators.required]],
      idJefeNuevo2: "Ninguno",
      idJefeViejo1: this.rama.encargado1,
      idJefeViejo2: this.rama.encargado2,
    });
  }

  get form() { return this.ramaForm.controls }
  get formRama() { return this.ramaModificadaForm.controls }

  public getZonas() {
    this.zonaService.getAllZonas().subscribe(
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
    this.ramaService.getRamas(newZona).subscribe(
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
  }

  consultar() {
    this.ramaModificadaForm.reset();
    this.ramaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    this.encargado1 = false; this.encargadoViejo1 = false; this.encargadoViejo2 = false;
    this.encargado2 = false;

    this.ramaService.getUnaRama(this.selectedOptionZona, this.selectedOptionRama).subscribe(res => {
      console.log(res);
      this.ramaSuccess(res);
      this.show = true;
    }, error => console.log(error))
  }

  ramaSuccess = (res) => {
    this.toastr.clear();

    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      let ramaTemp: any = res.body.rama;
      this.rama = ramaTemp;
      if (this.rama.encargado1 != undefined) {
        this.encargado1 = this.rama.encargado1;
        this.consultarEncargado1();
      } if (this.rama.encargado2 != undefined) {
        this.encargado2 = this.rama.encargado2;
        this.consultarEncargado2();
      }
      this.getPosiblesEncargados();
    }
  }

  consultarEncargado1() {
    this.miembroService.getUnMiembroxID(this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1 = encargadoTemp.miembro;
        this.encargadoViejo1 = this.encargado1;
      }
    );
  }

  consultarEncargado2() {
    this.miembroService.getUnMiembroxID(this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2 = encargadoTemp.miembro;
        this.encargadoViejo2 = this.encargado2;
      }
    );
  }

  getPosiblesEncargados() {
    this.toastr.clear();
    this.ramaService.consultarMiembrosRama(this.selectedOptionZona, this.selectedOptionRama).subscribe(res => {
        console.log(res);
        let enviar: any = res.body;
        if (enviar.success == false) {
          this.toastr.error(enviar.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          setTimeout(() => {
            this.agregarEncargados(enviar.miembros);
            this.ramaModificadaForm.controls['idJefeNuevo1'].setValue(this.encargadoViejo1.id);
            if (this.encargado2) {
              this.ramaModificadaForm.controls['idJefeNuevo2'].setValue(this.encargadoViejo2.id);
            }
          }, 400)
        }
    }, error => console.log(error))
  }

  agregarEncargados(res){
    this.encargados = [];
    Object.values(res).forEach(element => {
      let encargado: any = element;
      this.miembroService.getUnMiembroxID(encargado.id).subscribe(
        res => {
          let encargadoTemp: any = res.body;

          if (encargadoTemp.success == true){
            this.encargados.push(encargadoTemp.miembro);
          }
        }
      );
    });
  }

  changeEncargado1(id) {
    for (let encargado of this.encargados) {
      if (encargado.id == id) {
        this.encargado1 = encargado;
      }
    }
  }

  changeEncargado2(id) {
    if (this.encargado1.id == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });
      this.encargado2 = false;
      this.ramaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    } else {
      for (let encargado of this.encargados) {
        if (encargado.id == id) {
          this.encargado2 = encargado;
          return;
        }
      }
      this.encargado2 = false;
    }
  }

  modificar() {
    this.ramaModificadaForm.controls['idJefeViejo1'].setValue(this.encargadoViejo1.id);
    this.ramaModificadaForm.controls['idJefeViejo2'].setValue(this.encargadoViejo2.id);
    this.ramaModificadaForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.ramaModificadaForm.controls['idRama'].setValue(this.selectedOptionRama);
    this.ramaModificadaForm.controls['nombre'].setValue(this.rama.nombre);
    let ramaInfo = this.ramaModificadaForm.getRawValue();

    if(ramaInfo.idJefeNuevo2 == "Ninguno"){
      delete ramaInfo['idJefeNuevo2'];
    }
    if(this.encargadoViejo2.id == undefined){
      delete ramaInfo['idJefeViejo2'];
    }
    if(this.encargadoViejo1.id == undefined){
      delete ramaInfo['idJefeViejo1'];
    }

    console.log(ramaInfo);


    this.submitted = true;


    if (this.ramaModificadaForm.invalid) return;

    this.ramaService.modificarRama(ramaInfo).subscribe(res => {
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
      this.toastr.success("La solicitud se realizó con éxito", 'Rama Modificada', {timeOut: 2000});
      console.log("Éxito");
    }
  }


}
