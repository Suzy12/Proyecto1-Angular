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
  grupo:any = {};
  encargado1:any = false;
  encargado2:any = false;
  miembros: any = [];


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
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]]
    });
  }
  get form() { return this.grupoForm.controls }

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
    this.grupos = [];
    this.ramaService.getRama(newZona).subscribe(
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
      if(this.grupo.encargado1 != undefined){
        this.encargado1 = this.grupo.encargado1;
        this.consultarEncargado1();
      }if(this.grupo.encargado2 != undefined){
        this.encargado2 = this.grupo.encargado2;
        this.consultarEncargado2();
      }
    }
  }

  listaMiembros(res){
    this.miembros = [];
    Object.values(res.miembros).forEach(element => {
      this.miembros.push(element);
    });
    this.show = true;
  }

  consultarEncargado1(){
    this.miembroService.getUnMiembroxID(this.encargado1).subscribe(
      res =>{
        let encargadoTemp:any = res.body;
        this.encargado1 = encargadoTemp.miembro;
      }
    );
  }
  consultarEncargado2(){
    this.miembroService.getUnMiembroxID(this.encargado2).subscribe(
      res =>{
        let encargadoTemp:any = res.body;
        this.encargado2 = encargadoTemp.miembro;
      }
    );
  }




}
