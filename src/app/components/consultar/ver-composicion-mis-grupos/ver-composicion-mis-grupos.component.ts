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
  selector: 'app-ver-composicion-mis-grupos',
  templateUrl: './ver-composicion-mis-grupos.component.html',
  styleUrls: ['./ver-composicion-mis-grupos.component.scss']
})
export class VerComposicionMisGruposComponent implements OnInit {

  zonas: any = [];
  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  selectedOptionGrupo: any;
  public show: boolean = false;
  consultarForm: FormGroup;
  submitted: Boolean = false;
  nodo: any = {};
  miembros: any = [];
  movimiento = this.storage.get('current-user-movimiento');
  miembro = this.storage.get('current-user');
  grupoViejo: any = "";
  grupo: any = {};
  encargado1: any = false;
  encargado2: any = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRamas();
    this.consultarForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idRama: ['', [Validators.required]]
    });
  }

  get form() { return this.consultarForm.controls }

  //===================Get Ramas en las que esta el miembro consultado=========================
  getRamas() {
    this.ramas = [];
    this.grupos = [];
    this.ramaService.consultarRamaDeMiembro(this.movimiento, this.miembro).subscribe(
      res => {
        let ramasTemp: any = res.body;
        if (ramasTemp.success == false) {
          this.toastr.error(ramasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(ramasTemp);
          this.selectedOptionZona = ramasTemp.ramas[0].id_zona + "";
          Object.values(ramasTemp.ramas).forEach(element => {
            this.ramas.push(element);
          });
        }
      },
      err => console.log(err)
    )
    if (this.selectedOptionRama != undefined)
      this.getGrupoViejo(this.selectedOptionRama);
  }


  //=============Get Grupo del cual el miembro sera eliminado (su grupo actual)==================
  getGrupoViejo(newRama) {
    console.log(this.selectedOptionZona);
    console.log(newRama);
    console.log(this.miembro);
    this.grupoService.consultarGrupoDeMiembro(this.movimiento, this.selectedOptionZona, newRama + "", this.miembro).subscribe(res => {
      let grupoTemp: any = res.body;
      if (grupoTemp.success == false) {
        this.toastr.error(grupoTemp.error.message, 'Error', { timeOut: 5000 });
        console.log("Error");
      } else {
        console.log(grupoTemp);
        this.grupoViejo = grupoTemp.grupo[0];
        this.selectedOptionGrupo = ""+this.grupoViejo.id_grupo;
      }
    }, error => console.log(error));
  }

  //=============Consultar grupo seleccionado===============
  consultar() {
    this.submitted = true;
    if (this.consultarForm.invalid) {
      return;
    }
    let grupoInfo = {idMovimiento: this.movimiento, idZona: this.selectedOptionZona, idRama: this.selectedOptionRama, idGrupo: this.selectedOptionGrupo}
    this.grupoService.getUnGrupo(grupoInfo).subscribe(res => {
      console.log(res);
      this.grupoSuccess(res);
      this.listaMiembros(res.body);
    }, error => console.log(error))
    this.submitted = false;
  }

  grupoSuccess = (res) => {
    this.toastr.clear();
    this.encargado2 = false;

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

