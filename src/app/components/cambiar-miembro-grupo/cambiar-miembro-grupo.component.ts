import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ZonaService } from '../../services/zonas/zona.service'
import { RamaService } from '../../services/ramas/rama.service'
import { GrupoService } from '../../services/grupos/grupo.service'
import { ToastrService } from 'ngx-toastr';
import { MiembroService } from '../../services/miembros/miembro.service'

@Component({
  selector: 'app-cambiar-miembro-grupo',
  templateUrl: './cambiar-miembro-grupo.component.html',
  styleUrls: ['./cambiar-miembro-grupo.component.scss']
})
export class CambiarMiembroGrupoComponent implements OnInit {

  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  miembroForm: FormGroup;
  miembroGrupoForm: FormGroup;
  submitted: Boolean = false;
  submittedCambiar: Boolean = false;
  miembro: any = {}
  grupoViejo: any = "";
  show: Boolean = false;
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
    this.miembroForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idMiembro: ['', [Validators.required]]
    });
    this.miembroGrupoForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: [this.selectedOptionZona, [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupoViejo: this.grupoViejo.id,
      idGrupoNuevo: ['', [Validators.required]],
      idMiembro: this.miembro.id
    });

  }

  get form() { return this.miembroForm.controls }
  get formMiembroGrupo() { return this.miembroGrupoForm.controls }


  //=============Consultar miembro por cedula===============
  consultar() {
    this.miembro = {};
    this.grupoViejo = "";
    this.miembroGrupoForm.reset();
    let miembroInfo = this.miembroForm.getRawValue();

    this.submitted = true;

    if (this.miembroForm.invalid) return;

    this.miembroService.getUnMiembro(miembroInfo).subscribe(
      res => {
        let miembroTemp: any = res.body;
        if (miembroTemp.success == false) {
          this.toastr.error(miembroTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.miembro = miembroTemp.miembro;
          this.getRamas(this.miembro.id);
        }
      },
      err => console.log(err)
    )
    this.show = true;

    this.submitted = false;

  }

  //===================Get Ramas en las que esta el miembro consultado=========================
  getRamas(idMiembro) {
    this.ramas = [];
    this.grupos = [];
    this.ramaService.consultarRamaDeMiembro(this.movimiento, idMiembro).subscribe(
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
    console.log(this.miembro.id);
    this.grupoService.consultarGrupoDeMiembro(this.movimiento, this.selectedOptionZona, newRama + "", this.miembro.id).subscribe(res => {
      let grupoTemp: any = res.body;
      if (grupoTemp.success == false) {
        this.toastr.error(grupoTemp.error.message, 'Error', { timeOut: 5000 });
        console.log("Error");
      } else {
        console.log(grupoTemp);
        this.grupoViejo = grupoTemp.grupo[0];
        this.getGrupos(newRama + "");

      }
    }, error => console.log(error));
  }


  //============Get los demas grupos de la rama seleccionada===============
  getGrupos(newRama) {
    this.grupos = [];
    this.grupoService.getGrupos(this.movimiento, this.selectedOptionZona, newRama).subscribe(
      res => {
        let gruposTemp: any = res.body;
        if (gruposTemp.success == false) {
          this.toastr.error(gruposTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(gruposTemp);

          Object.values(gruposTemp.grupos).forEach(element => {
            let grupo: any = element;
            if (grupo.id != this.grupoViejo.id_grupo) //eliminar grupo actual de la lista de grupos a los que puede cambiarse
              this.grupos.push(grupo);
          });

        }
      },
      err => console.log(err)
    )
  }


  //============Cambiar miembro de grupo================
  cambiar() {

    //Agregar los valores que faltan al form/JSON
    this.miembroGrupoForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.miembroGrupoForm.controls['idMiembro'].setValue(this.miembro.id);
    this.miembroGrupoForm.controls['idGrupoViejo'].setValue(this.grupoViejo.id_grupo + "");
    this.miembroGrupoForm.controls['idMovimiento'].setValue(this.movimiento);

    let cambiarInfo = this.miembroGrupoForm.getRawValue();

    this.submittedCambiar = true;


    if (this.miembroGrupoForm.invalid) return;

    console.log(cambiarInfo);

    this.miembroService.cambiarMiembroGrupo(cambiarInfo).subscribe(
      res => {
        let miembroTemp: any = res.body;
        if (miembroTemp.success == false) {
          this.toastr.error(miembroTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.toastr.success("La solicitud se realizó con éxito", 'Miembro Cambiado a Nuevo Grupo', { timeOut: 5000 });
          console.log("Éxito");
        }
      },
      err => console.log(err)
    )

    this.submittedCambiar = false;

  }

}
