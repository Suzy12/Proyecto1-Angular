import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { ToastrService } from 'ngx-toastr';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  headElements = ["Nombre", "Dirección", "Email", "Celular"];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
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
      nombre: ['', [Validators.required]]
    });
  }

  get form(){
    return this.zonaForm.controls;
  }

  consultarZona(){
    let zone = this.zonaForm.getRawValue().idZona;
    console.log(zone);
    this.getMembersZone(zone);
  }

  getMembersZone(zone){
    this.zonaService.consultarMiembrosZona(this.movimiento, zone).subscribe(res =>{
      this.routeState = res.body;
      this.membersZ = this.routeState.miembros;
      console.log(this.membersZ);
    })
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
}
