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
  selector: 'app-agregar-miembro-grupo',
  templateUrl: './agregar-miembro-grupo.component.html',
  styleUrls: ['./agregar-miembro-grupo.component.scss']
})
export class AgregarMiembroGrupoComponent implements OnInit {

  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  miembroForm: FormGroup;
  miembroGrupoForm: FormGroup;
  submitted: Boolean = false;
  submittedAgregar: Boolean = false;
  miembro:any = {}


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

  get form() { return this.miembroForm.controls }
  get formMiembroGrupo() { return this.miembroGrupoForm.controls }

  ngOnInit(): void {
    this.miembroForm = this.formBuilder.group({
      idMiembro: ['', [Validators.required]]
    });
    this.miembroGrupoForm = this.formBuilder.group({
      idZona: [this.selectedOptionZona, [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      idMiembro: this.miembro.id
    });
  }

  consultar(){
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
          this.selectedOptionZona = miembroTemp.grupos[0].idZona;
          this.getRamas(this.miembro.id);
        }
      },
      err => console.log(err)
    )

    this.submitted = false;

  }

  getRamas(idMiembro) {
    this.ramas = [];
    this.grupos = [];
    this.ramaService.getRamasDisponibles(idMiembro).subscribe(
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

  getGrupos(newRama) {
    this.grupos = [];
    this.grupoService.getGrupos(this.selectedOptionZona, newRama).subscribe(
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

  agregar(){
    let agregarInfo = this.miembroGrupoForm.getRawValue();
    
    this.submittedAgregar = true;


    if (this.miembroGrupoForm.invalid) return;

    this.miembroService.agregarMiembroGrupo(agregarInfo).subscribe(
      res => {
        let miembroTemp: any = res.body;
        if (miembroTemp.success == false) {
          this.toastr.error(miembroTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.toastr.success("La solicitud se realizó con éxito", 'Miembro Agregado a Nuevo Grupo', {timeOut: 2000});
          console.log("Éxito"); 
        }
      },
      err => console.log(err)
    )

    this.submittedAgregar = false;

  }



}
