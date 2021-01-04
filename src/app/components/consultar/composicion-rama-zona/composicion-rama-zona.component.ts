import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { ToastrService } from 'ngx-toastr';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiembroService } from '../../../services/miembros/miembro.service'

@Component({
  selector: 'app-composicion-rama-zona',
  templateUrl: './composicion-rama-zona.component.html',
  styleUrls: ['./composicion-rama-zona.component.scss']
})
export class ComposicionRamaZonaComponent implements OnInit {
  routeState: any;
  zonas: any = [];
  zonas_leader: any = [];
  ramas: any = [];
  membersR : any = [];
  membersZ : any = [];
  movimiento = this.storage.get('current-user-movimiento');
  ced = this.storage.get('current-user');
  zonaForm: FormGroup;
  ramaForm: FormGroup;
  headElements = ["Nombre", "Cédula", "Celular", "Email", "Dirección"];
  encargado1Rama: any = false;
  encargado2Rama: any = false;
  encargado1: any = false;
  encargado2: any = false;
  rama: any = "";
  zona: any = "";
  showRama = false;
  show = false;



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private miembroService: MiembroService,
  ) {

    zonaService.zonasLider(this.movimiento, this.ced).subscribe(res => {
      this.routeState = res.body;
      this.zonas_leader = this.routeState.zonas;
      console.log(this.zonas);
    })

    zonaService.zonasMiembro(this.movimiento, this.ced).subscribe(res => {
      this.routeState = res.body;
      this.zonas = this.routeState.zonas;
      console.log(this.zonas);
    })

  }

  ngOnInit(): void {
    this.zonaForm = this.formBuilder.group({
      idZona: ['', [Validators.required]],
      idMovimiento: this.movimiento
    });
    this.ramaForm = this.formBuilder.group({
      idRama: ['', [Validators.required]],
      idZona: ['', [Validators.required]],
      idMovimiento: this.movimiento,
    });
  }

  get form(){
    return this.zonaForm.controls;
  }

  consultarZona(){
    let zone = this.zonaForm.getRawValue().idZona;
    console.log(zone);
    this.zonaService.getUnaZona(this.movimiento, zone).subscribe(res => {
      console.log(res);
      this.zonaSuccess(res);
      this.show = true;
    }, error => console.log(error))
    this.getMembersZone(zone);
  }

  getMembersZone(zone){
    this.zonaService.consultarMiembrosZona(this.movimiento, zone).subscribe(res =>{
      this.routeState = res.body;
      this.membersZ = this.routeState.miembros;
      console.log(this.membersZ);
    })
  }

  zonaSuccess = (res) => {
    this.toastr.clear();
    this.encargado2 = false;

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
    }
  }

  //=============Consultar informacion del encargado 1===============
  consultarEncargado1() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1 = encargadoTemp.miembro;
      }
    );
  }

  //=============consultar informacion del encargado 2===============
  consultarEncargado2() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2 = encargadoTemp.miembro;
      }
    );
  }


  //------------------------------------------------------------------------------------------------------------------

  getRamas(zone){
    this.ramas = [];
    this.ramaService.ramaLider(this.movimiento, zone, this.ced).subscribe( res =>{
      this.routeState = res.body;
      Object.values(this.routeState.ramas).forEach((element, index) => {
        let rama: any = element;
        this.ramas.push(rama);
        console.log(rama);
      });
    })
  }

  consultarRama(){
    console.log(this.ramaForm.getRawValue());
    let zone = this.ramaForm.getRawValue().idZona;
    let branch = this.ramaForm.getRawValue().idRama;
    this.ramaService.getUnaRama(this.movimiento, zone, branch).subscribe(res => {
      console.log(res);
      this.ramaSuccess(res);
      this.showRama = true;
    }, error => console.log(error))
    this.getMembersBranch(zone, branch);
  }

  getMembersBranch(zone, branch){
    console.log(branch);
    this.ramaService.consultarMiembrosRama(this.movimiento, zone, branch).subscribe(res => {
      this.routeState = res.body;
      this.membersR = this.routeState.miembros;
      console.log(this.membersR);
    })
  }

  ramaSuccess = (res) => {
    this.toastr.clear();
    this.encargado2Rama = false;
    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      let ramaTemp: any = res.body.rama;
      this.rama = ramaTemp;
      if (this.rama.encargado1 != undefined) {
        this.encargado1 = this.rama.encargado1;
        this.consultarEncargado1Rama();
      } if (this.rama.encargado2 != undefined) {
        this.encargado2 = this.rama.encargado2;
        this.consultarEncargado2Rama();
      }
    }
  }

  //=============Get informacion del encargado 1===============
  consultarEncargado1Rama() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado1).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado1Rama = encargadoTemp.miembro;
      }
    );
  }

  //=============Get Informacion del encargado 2===============
  consultarEncargado2Rama() {
    this.miembroService.getUnMiembroxID(this.movimiento, this.encargado2).subscribe(
      res => {
        let encargadoTemp: any = res.body;
        this.encargado2Rama = encargadoTemp.miembro;
      }
    );
  }
}
