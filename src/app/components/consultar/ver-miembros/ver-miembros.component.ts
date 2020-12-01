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
  selector: 'app-ver-miembros',
  templateUrl: './ver-miembros.component.html',
  styleUrls: ['./ver-miembros.component.scss']
})
export class VerMiembrosComponent implements OnInit {

  zonas: any = [];
  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  selectedOptionGrupo: any;
  public show: boolean = false;
  consultarForm: FormGroup;
  nodo: any = {};
  miembros: any = [];
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
    this.consultarForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      nodo: ['checkZona', [Validators.required]],
    });
  }

  get form() { return this.consultarForm.controls }

  //=============Get all zonas del movimiento==============
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

  //=============Get all ramas de zona seleccionada===============
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


  //=============Get all grupos de zona y rama seleccionada===============
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

  //=============Consultar miembros===============
  consultar() {
    this.miembros = [];
    let nodoTemp = this.consultarForm.get('nodo').value;
    console.log(nodoTemp);
    if (nodoTemp == "checkZona") {  //consultar miembros de la zona
      this.consultarMiembrosZona();
    } else if (nodoTemp == "checkRama") { //consultar miembros de la rama
      this.consultarMiembrosRama();
    } else {
      this.consultarMiembrosGrupo(); //consultar miembros del grupo
    }
    this.show = true;
  }

  //=============Consultar miembros de la zona seleccionada===============
  consultarMiembrosZona() {
    this.miembros = [];
    this.zonaService.consultarMiembrosZona(this.movimiento, this.selectedOptionZona).subscribe(
      res => {
        let zonasTemp: any = res.body;
        if (zonasTemp.success == false) {
          this.toastr.error(zonasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(zonasTemp);

          Object.values(zonasTemp.miembros).forEach(element => {
            this.miembros.push(element);
          });
        }
      },
      err => console.log(err)
    );
  }

  //=============Consultar miembros de la rama seleccionada===============
  consultarMiembrosRama() {
    this.miembros = [];
    this.ramaService.consultarMiembrosRama(this.movimiento, this.selectedOptionZona, this.selectedOptionRama).subscribe(
      res => {
        let ramasTemp: any = res.body;
        if (ramasTemp.success == false) {
          this.toastr.error(ramasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(ramasTemp);

          Object.values(ramasTemp.miembros).forEach(element => {
            this.miembros.push(element);
          });
        }
      },
      err => console.log(err)
    )
  }

  //=============Consultar miembros del grupo seleccionado===============
  consultarMiembrosGrupo() {
    this.miembros = [];
    this.grupoService.consultarMiembrosGrupo(this.movimiento, this.selectedOptionZona, this.selectedOptionRama, this.selectedOptionGrupo).subscribe(
      res => {
        let gruposTemp: any = res.body;
        if (gruposTemp.success == false) {
          this.toastr.error(gruposTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(gruposTemp);

          Object.values(gruposTemp.miembros).forEach(element => {
            this.miembros.push(element);
          });
        }
      },
      err => console.log(err)
    )

  }

}
