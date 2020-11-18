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
  selector: 'app-modificar-grupo',
  templateUrl: './modificar-grupo.component.html',
  styleUrls: ['./modificar-grupo.component.scss']
})
export class ModificarGrupoComponent implements OnInit {

  zonas: any = [];
  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  selectedOptionGrupo: any;
  nombreGrupo: any;
  public show: boolean = false;
  grupoForm: FormGroup;
  grupoModificadoForm: FormGroup;
  grupo: any = {};
  movimiento = this.storage.get('current-user-movimiento');

  encargado1: any = false;
  encargado2: any = false;
  encargadoViejo1: any = false;
  encargadoViejo2: any = false;
  encargados: any = [];
  isMonitor: Boolean = false;
  cambiarFaseMonitor: Boolean = false;
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
    this.grupoForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]]
    });
    this.grupoModificadoForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: this.selectedOptionZona,
      idRama: this.selectedOptionRama,
      idGrupo: this.selectedOptionGrupo,
      nombre: this.grupo.nombre,
      isMonitor: this.grupo.isMonitor,
      idJefeNuevo1: [this.grupo.encargado1, [Validators.required]],
      idJefeNuevo2: "Ninguno",
      idJefeViejo1: [this.grupo.encargado1, [Validators.required]],
      idJefeViejo2: this.grupo.encargado2,
    });
  }

  get form() { return this.grupoForm.controls }
  get formGrupo() { return this.grupoModificadoForm.controls }

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
    this.grupos = [];
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
    if (this.selectedOptionRama != undefined)
      this.getGrupos(this.selectedOptionRama);
  }

  getGrupos(newRama) {
    this.grupos = [];
    this.grupoService.getGrupos(this.movimiento, this.selectedOptionZona, newRama).subscribe(
      res => {
        let gruposTemp: any = res.body;
        if (gruposTemp.success == false) {
          this.toastr.error(gruposTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {

          Object.values(gruposTemp.grupos).forEach(element => {
            this.grupos.push(element);
          });
        }
      },
      err => console.log(err)
    )
  }

  consultarGrupo() {
    this.grupoModificadoForm.reset();
    this.grupoModificadoForm.controls['idJefeNuevo2'].setValue('Ninguno');
    this.encargado1 = false; this.encargadoViejo1 = false; this.encargadoViejo2 = false;
    this.encargado2 = false;

    let grupoInfo = this.grupoForm.getRawValue();
    this.grupoService.getUnGrupo(grupoInfo).subscribe(res => {
      console.log(res);
      this.grupoSuccess(res);
      this.show = true;
    }, error => console.log(error))
  }

  grupoSuccess = (res) => {
    this.toastr.clear();

    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      let grupoTemp: any = res.body.grupo;
      this.grupo = grupoTemp;
      this.isMonitor = this.grupo.isMonitor;
      if (this.grupo.encargado1 != undefined) {
        this.encargado1 = this.grupo.encargado1;
        this.consultarEncargado1();
      } if (this.grupo.encargado2 != undefined) {
        this.encargado2 = this.grupo.encargado2;
        this.consultarEncargado2();
      }
      this.grupoModificadoForm.controls['nombre'].setValue(this.grupo.nombre);
      this.getPosiblesEncargados(this.grupo.isMonitor);
    }
  }

  consultarEncargado1() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1 = encargadoTemp.miembro;
        this.encargadoViejo1 = this.encargado1;
        console.log(this.encargadoViejo1.id);
      }
    );
  }

  consultarEncargado2() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2 = encargadoTemp.miembro;
        this.encargadoViejo2 = this.encargado2;
      }
    );
  }

  getPosiblesEncargados(isMonitor) {
    let grupoInfo = this.grupoForm.getRawValue();
    this.toastr.clear();

    if (isMonitor) { //si está en la fase de evaluación, busca monitores
      this.miembroService.getMonitoresPosibles(grupoInfo).subscribe(res => {
        console.log(res);
        let enviar: any = res.body;
        if (enviar.success == false) {
          this.toastr.error(enviar.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          setTimeout(() => {
            this.agregarEncargados(enviar.monitores);
            this.grupoModificadoForm.controls['idJefeNuevo1'].setValue(this.encargadoViejo1.id);
            this.encargados.push(this.encargadoViejo1);
            if (this.encargado2) {
              this.encargados.push(this.encargadoViejo2);
              this.grupoModificadoForm.controls['idJefeNuevo2'].setValue(this.encargadoViejo2.id);
            }
          }, 500)
        }
      }, error => console.log(error))

    } else { //si no está en la fase de evaluación, busca jefes (miembros del grupo)   
      this.grupoService.consultarMiembrosGrupo(this.movimiento, this.selectedOptionZona, this.selectedOptionRama, this.selectedOptionGrupo).subscribe(res => {
        {
          console.log(res);
          let enviar: any = res.body;
          if (enviar.success == false) {
            this.toastr.error(enviar.error.message, 'Error', { timeOut: 5000 });
            console.log("Error");
          } else {
            setTimeout(() => {
              this.agregarEncargados(enviar.miembros);
              this.grupoModificadoForm.controls['idJefeNuevo1'].setValue(this.encargadoViejo1.id);
              if (this.encargado2) {
                this.grupoModificadoForm.controls['idJefeNuevo2'].setValue(this.encargadoViejo2.id);
              }
            }, 500)
          }
        }
      }, error => console.log(error))
    }
  }


  agregarEncargados(res) {
    this.encargados = [];
    Object.values(res).forEach(element => {
      let encargado: any = element;
      if (encargado.id == this.encargadoViejo1.id && this.cambiarFaseMonitor) {
        return;
      } if (this.encargadoViejo2) {
        if (encargado.id == this.encargadoViejo2.id && this.cambiarFaseMonitor)
          return;
      }
      this.miembroService.getUnMiembroxID(this.movimiento, encargado.id).subscribe(
        res => {
          let encargadoTemp: any = res.body;

          if (encargadoTemp.success == true) {
            this.encargados.push(encargadoTemp.miembro);
          }
        }
      );
    });
  }

  cambiarFase(values: any) {
    let cambiar = values.currentTarget.checked;
    this.cambiarFaseMonitor = cambiar;
    this.getPosiblesEncargados(!cambiar);
    this.grupo.isMonitor = !cambiar;
    this.grupoModificadoForm.controls['idJefeNuevo1'].setValue('');
    this.grupoModificadoForm.controls['idJefeNuevo2'].setValue('Ninguno');
  }


  changeEncargado1(id) {
    if (this.encargado2.id == id) {
      this.toastr.clear();
      this.toastr.warning("Por favor utilice un Encargado 2 diferente al Encargado 1", 'Advertencia', { timeOut: 10000 });
      
      this.encargado2 = false;
      this.grupoModificadoForm.controls['idJefeNuevo2'].setValue('Ninguno');
    }
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
      this.grupoModificadoForm.controls['idJefeNuevo2'].setValue('Ninguno');
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
    this.grupoModificadoForm.controls['idJefeViejo1'].setValue(this.encargadoViejo1.id);
    this.grupoModificadoForm.controls['idJefeViejo2'].setValue(this.encargadoViejo2.id);
    this.grupoModificadoForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.grupoModificadoForm.controls['idRama'].setValue(this.selectedOptionRama);
    this.grupoModificadoForm.controls['idGrupo'].setValue(this.selectedOptionGrupo);
    this.grupoModificadoForm.controls['idMovimiento'].setValue(this.movimiento);
    let grupoInfo = this.grupoModificadoForm.getRawValue();
    if (grupoInfo.idJefeNuevo2 == "Ninguno" || grupoInfo.idJefeNuevo2 == '') {
      delete grupoInfo['idJefeNuevo2'];
    }
    if (this.encargadoViejo2.id == undefined) {
      delete grupoInfo['idJefeViejo2'];
    }
    if (this.cambiarFaseMonitor) {
      grupoInfo.isMonitor = false;
    } else {
      grupoInfo.isMonitor = this.grupo.isMonitor;
    }

    this.submitted = true;


    if (this.grupoModificadoForm.invalid) return;

    console.log(grupoInfo);

    this.grupoService.modificarGrupo(grupoInfo).subscribe(res => {
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
      this.toastr.success("La solicitud se realizó con éxito", 'Grupo Modificado', { timeOut: 1000 });
      console.log("Éxito");
    }
  }

}
