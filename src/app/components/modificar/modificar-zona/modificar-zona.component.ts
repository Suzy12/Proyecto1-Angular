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
  selector: 'app-modificar-zona',
  templateUrl: './modificar-zona.component.html',
  styleUrls: ['./modificar-zona.component.scss']
})
export class ModificarZonaComponent implements OnInit {

  zonas: any = [];

  encargado1: any = false;
  encargado2: any = false;
  encargadoViejo1: any = false;
  encargadoViejo2: any = false;
  encargados: any = [];

  selectedOptionZona: any;

  public show: boolean = false;
  zonaForm: FormGroup;
  zonaModificadaForm: FormGroup;
  zona: any = {};
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
    this.zonaForm = this.formBuilder.group({
      idZona: ['', [Validators.required]]
    });
    this.zonaModificadaForm = this.formBuilder.group({
      idZona: this.selectedOptionZona,
      nombre: '',
      idJefeNuevo1: [this.zona.encargado1, [Validators.required]],
      idJefeNuevo2: "Ninguno",
      idJefeViejo1: this.zona.encargado1,
      idJefeViejo2: this.zona.encargado2,
    });
  }

  get form() { return this.zonaForm.controls }
  get formZona() { return this.zonaModificadaForm.controls }

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

  consultar() {
    this.zonaModificadaForm.reset();
    this.zonaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
    this.encargado1, this.encargado2, this.encargadoViejo1, this.encargadoViejo2 = undefined;

    this.zonaService.getUnaZona(this.selectedOptionZona).subscribe(res => {
      console.log(res);
      this.zonaSuccess(res);
      this.show = true;
    }, error => console.log(error))
  }

  zonaSuccess = (res) => {
    this.toastr.clear();

    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      let zonaTemp: any = res.body.zona;
      this.zona = zonaTemp;
      if (this.zona.encargado1 != undefined) {
        this.encargado1 = this.zona.encargado1;
        this.consultarEncargado1();
      } if (this.zona.encargado2 != undefined) {
        this.encargado2 = this.zona.encargado2;
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
    this.zonaService.consultarMiembrosZona(this.selectedOptionZona).subscribe(res => {
        console.log(res);
        let enviar: any = res.body;
        if (enviar.success == false) {
          this.toastr.error(enviar.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.agregarEncargados(enviar.miembros);
        }
    }, error => console.log(error))
  }

  agregarEncargados(res){
    this.encargados = [];
    Object.values(res).forEach(element => {
      let encargado: any = element;
      /*if(encargado.id == this.encargadoViejo1.id){
        return;
      }if(this.encargadoViejo2){
        if(encargado.id == this.encargadoViejo2.id)
        return;
      }*/
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
      this.zonaModificadaForm.controls['idJefeNuevo2'].setValue('Ninguno');
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
    this.zonaModificadaForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.zonaModificadaForm.controls['nombre'].setValue(this.zona.nombre);
    let zonaInfo = this.zonaModificadaForm.getRawValue();

    if(zonaInfo.idJefeNuevo2 == "Ninguno"){
      delete zonaInfo['idJefeNuevo2'];
    }
    if(this.encargadoViejo2 == undefined){
      delete zonaInfo['idJefeViejo2'];
    }else{
      zonaInfo.idJefeViejo2 = this.encargadoViejo2.id;
    }
    if(this.encargadoViejo1 == undefined){
      delete zonaInfo['idJefeViejo1'];
    }else{
      zonaInfo.idJefeViejo1 = this.encargadoViejo1.id;
    }
    
    console.log(zonaInfo);


    this.submitted = true;


    if (this.zonaModificadaForm.invalid) return;

    this.zonaService.modificarZona(zonaInfo).subscribe(res => {
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
      this.toastr.success("La solicitud se realizó con éxito", 'Zona Modificada', {timeOut: 2000});
      console.log("Éxito");
    }
  }

}
