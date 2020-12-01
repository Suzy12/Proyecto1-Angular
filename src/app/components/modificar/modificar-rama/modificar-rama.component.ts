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
  movimiento = this.storage.get('current-user-movimiento');

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
      idMovimiento: this.movimiento,
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]]
    });
    this.ramaModificadaForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: this.selectedOptionZona,
      idRama: this.selectedOptionRama,
      nombre: '',
      idJefeNuevo1: [this.rama.encargado1, [Validators.required]],
      idJefeNuevo2: "Ninguno",
      idJefeViejo1: this.rama.encargado1,
      idJefeViejo2: this.rama.encargado2,
    });
  }

  get form() { return this.ramaForm.controls } //form consultar rama
  get formRama() { return this.ramaModificadaForm.controls } //form modificar rama

  //=============Get all zonas del movimiento===============
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

  //=============get all ramas de la zona seleccionada===============
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
  }

  //=============Consultar rama seleccionada===============
  consultar() {
    this.ramaModificadaForm.reset();
    this.ramaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    this.encargado1 = false; this.encargadoViejo1 = false; this.encargadoViejo2 = false;
    this.encargado2 = false;

    this.ramaService.getUnaRama(this.movimiento, this.selectedOptionZona, this.selectedOptionRama).subscribe(res => {
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

  //=============Get informacion del encargado 1===============
  consultarEncargado1() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1 = encargadoTemp.miembro;
        this.encargadoViejo1 = this.encargado1;
      }
    );
  }

  //=============Get Informacion del encargado 2===============
  consultarEncargado2() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2 = encargadoTemp.miembro;
        this.encargadoViejo2 = this.encargado2;
      }
    );
  }

  //=============Get Posibles Encargados de la Rama (jefes de grupo y monitores)===============
  getPosiblesEncargados() {
    this.toastr.clear();
    this.ramaService.consultarMiembrosRama(this.movimiento, this.selectedOptionZona, this.selectedOptionRama).subscribe(res => {
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
        }, 500) //timeout de 500 ms para el set de los encargados viejos (porque las funciones son asincronicas)
      }
    }, error => console.log(error))
  }

  //=============Agregar los posibles encargados a la lista de encargados===============
  agregarEncargados(res) {
    this.encargados = [];
    Object.values(res).forEach(element => {
      let encargado: any = element;
      this.miembroService.getUnMiembroxID(this.movimiento, encargado.id).subscribe( //get info de cada posible encargado
        res => {
          let encargadoTemp: any = res.body;

          if (encargadoTemp.success == true) {
            this.encargados.push(encargadoTemp.miembro);
          }
        }
      );
    });
  }

  //=============Listener Encargado 1===============
  changeEncargado1(id) {
    if (this.encargado2.id == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });

      this.encargado2 = false;
      this.ramaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    }
    for (let encargado of this.encargados) { //get info del encargado en la lista de encargados
      if (encargado.id == id) {
        this.encargado1 = encargado;
      }
    }
  }

  //=============Listener Encargado 2===============
  changeEncargado2(id) {
    if (this.encargado1.id == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });
      this.encargado2 = false;
      this.ramaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    } else {
      for (let encargado of this.encargados) { //get info del encargado en la lista de encargados
        if (encargado.id == id) {
          this.encargado2 = encargado;
          return;
        }
      }
      this.encargado2 = false;
    }
  }

  //=============Modificar Rama===============
  modificar() {
    this.ramaModificadaForm.controls['idJefeViejo1'].setValue(this.encargadoViejo1.id);
    this.ramaModificadaForm.controls['idJefeViejo2'].setValue(this.encargadoViejo2.id);
    this.ramaModificadaForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.ramaModificadaForm.controls['idRama'].setValue(this.selectedOptionRama);
    this.ramaModificadaForm.controls['nombre'].setValue(this.rama.nombre);
    this.ramaModificadaForm.controls['idMovimiento'].setValue(this.movimiento);
    let ramaInfo = this.ramaModificadaForm.getRawValue();

    if (ramaInfo.idJefeNuevo2 == "Ninguno") { //no hay encargado 2
      delete ramaInfo['idJefeNuevo2'];
    }
    if (this.encargadoViejo2.id == undefined) { //no hay encargado viejo 2
      delete ramaInfo['idJefeViejo2'];
    }
    if (this.encargadoViejo1.id == undefined) { //no hay encargado viejo 1
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
    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      this.toastr.success("La solicitud se realizó con éxito", 'Rama Modificada', { timeOut: 2000 });
      console.log("Éxito");
    }
  }


}
