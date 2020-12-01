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
  selector: 'app-consultar-grupo',
  templateUrl: './consultar-grupo.component.html',
  styleUrls: ['./consultar-grupo.component.scss']
})
export class ConsultarGrupoComponent implements OnInit {

  zonas: any = [];
  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  selectedOptionGrupo: any;
  public show: boolean = false;
  grupoForm: FormGroup;
  grupo: any = {};
  encargado1: any = false;
  encargado2: any = false;
  miembros: any = [];
  movimiento = this.storage.get('current-user-movimiento');


  constructor(private formBuilder: FormBuilder,
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
  }
  get form() { return this.grupoForm.controls }


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

  //=============Get all ramas de la zona seleccionada===============
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

  //=============get all grupo de la zona y rama seleccionada===============
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

  
  //=============Consultar grupo seleccionado===============
  consultarGrupo() {
    let grupoInfo = this.grupoForm.getRawValue();
    this.grupoService.getUnGrupo(grupoInfo).subscribe(res => {
      console.log(res);
      this.grupoSuccess(res);
      this.listaMiembros(res.body);
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
      if (this.grupo.encargado1 != undefined) {
        this.encargado1 = this.grupo.encargado1; 
        this.consultarEncargado1();
      } if (this.grupo.encargado2 != undefined) {
        this.encargado2 = this.grupo.encargado2;
        this.consultarEncargado2();
      }
    }
  }

  //=============Consultar lista de miembros del grupo seleccionado===============
  listaMiembros(res) {
    this.miembros = [];
    Object.values(res.miembros).forEach(element => {
      this.miembros.push(element);
    });
    this.show = true;
  }

  //=============Consultar informacion del encargado 1 del grupo seleccionado===============
  consultarEncargado1() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1 = encargadoTemp.miembro;
      }
    );
  }

  //=============Consultar informacion del encargado 2 del grupo seleccionado===============
  consultarEncargado2() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2 = encargadoTemp.miembro;
      }
    );
  }




}
