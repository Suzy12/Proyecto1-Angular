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
  selectedOptionRama: any;
  miembroForm: FormGroup;
  miembroGrupoForm: FormGroup;
  submitted: Boolean = false;
  submittedAgregar: Boolean = false;
  miembro:any = {}
  show:Boolean = false;
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
    this.miembroForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idMiembro: ['', [Validators.required]]
    });
    this.miembroGrupoForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idZona: '',
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      idMiembro: '',
    });
  }

  get form() { return this.miembroForm.controls }
  get formMiembroGrupo() { return this.miembroGrupoForm.controls }

  consultar(){
    this.miembro = {};
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
          //console.log(miembroTemp.miembro);
          this.miembro = miembroTemp.miembro;
          this.getRamas(this.miembro.id);
          this.show = true;
        }
      },
      err => console.log(err)
    )

    this.submitted = false;

  }

  getRamas(idMiembro) {
    this.ramas = [];
    this.grupos = [];
    this.ramaService.getRamasDisponibles(this.movimiento,idMiembro).subscribe(
      res => {
        let ramasTemp: any = res.body;
        console.log(ramasTemp);
        if (ramasTemp.success == false) {
          this.toastr.error(ramasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.selectedOptionZona = ramasTemp.ramas[0].id_zona+"";
          console.log(this.selectedOptionZona);
          Object.values(ramasTemp.ramas).forEach(element => {
            this.ramas.push(element);
          });
        }
      },
      err => console.log(err)
    )
    if(this.selectedOptionRama != undefined)
      this.getGrupos(this.selectedOptionRama);
  }

  getGrupos(newRama) {
    this.grupos = [];
    console.log(this.selectedOptionZona);
    console.log(newRama);
    this.grupoService.getGrupos(this.movimiento, this.selectedOptionZona, newRama).subscribe(
      res => {
        let gruposTemp: any = res.body;
        if (gruposTemp.success == false) {
          this.toastr.error(gruposTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(gruposTemp);
          Object.values(gruposTemp.grupos).forEach(element => {
            this.grupos.push(element);
          });
        }
      },
      err => console.log(err)
    )
  }

  agregar(){
    
    this.submittedAgregar = true;

    this.miembroGrupoForm.controls['idZona'].setValue(this.selectedOptionZona);
    this.miembroGrupoForm.controls['idMiembro'].setValue(this.miembro.id);
    this.miembroGrupoForm.controls['idMovimiento'].setValue(this.movimiento);

    let agregarInfo = this.miembroGrupoForm.getRawValue();

    console.log(agregarInfo);

    if (this.miembroGrupoForm.invalid) return;

    console.log(agregarInfo);

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
