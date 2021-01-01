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
  gruposMiembro: any = [];
  zonas: any = [];
  zonas_leader: any = [];
  ramas: any = [];
  grupos: any = [];
  movimiento = this.storage.get('current-user-movimiento');
  ced = this.storage.get('current-user');
  zonaForm: FormGroup;
  ramaForm: FormGroup;
  submitted: Boolean = false;
  submittedRama: Boolean = false;


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
      idMovimiento: this.movimiento
    });
  }

  get form(){
    return this.zonaForm.controls;
  }

  getRamas(zone){
    this.ramas = [];
    this.ramaService.ramaLider(this.movimiento, zone, this.ced).subscribe( res =>{
      this.routeState = res.body;
      Object.values(this.routeState.ramas).forEach((element, index) => {
        let rama: any = element;
        this.ramas.push(rama.nombre);
      });
    })
  }

  consultarZona(){
    //console.log(this.zonaForm.getRawValue());
    let zone = this.zonaForm.getRawValue().idZona;
    console.log(zone);
    this.getMembersZone(zone);
  }

  getMembersZone(zone){
    this.zonaService.consultarMiembrosZona(this.movimiento, zone).subscribe(res =>{
      this.routeState = res.body;
      console.log(this.routeState);
    })
  }

  consultarRama(){
    console.log(this.ramaForm.getRawValue());
    let zone = this.ramaForm.getRawValue().idZona;
    let branch = this.ramaForm.getRawValue().idRama;
    this.getMembersBranch(zone, branch);
  }

  getMembersBranch(zone, branch){
    this.ramaService.consultarMiembrosRama(this.movimiento, zone, branch).subscribe(res => {
      console.log(res);
    })
  }
}
