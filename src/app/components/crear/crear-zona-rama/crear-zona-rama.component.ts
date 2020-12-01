import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-zona-rama',
  templateUrl: './crear-zona-rama.component.html',
  styleUrls: ['./crear-zona-rama.component.scss']
})
export class CrearZonaRamaComponent implements OnInit {

  zonas: any = [];
  zonaForm: FormGroup;
  ramaForm: FormGroup;
  submitted: Boolean = false;
  submittedRama: Boolean = false;
  movimiento = this.storage.get('current-user-movimiento');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getZonas();
    this.zonaForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      nombre: ['', [Validators.required]]
    });
    this.ramaForm = this.formBuilder.group({
      idZona: ['', [Validators.required]],
      idMovimiento: this.movimiento,
      nombre: ['', [Validators.required]]
    });
  }

  get form() { return this.zonaForm.controls } //form de crear zona
  get formRama() { return this.ramaForm.controls } //forma de crear rama

  //=============Get all zonas del movimiento==============
  public getZonas() {
    this.zonas = [];
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
    console.log(this.zonas);
  }

  //=============Crear la zona==============
  modificarZona() {
    let zonaInfo = this.zonaForm.getRawValue();

    this.submitted = true;
    if (this.zonaForm.invalid) return;

    console.log(zonaInfo);
    this.zonaService.crearZona(zonaInfo).subscribe(res => {
      console.log(res);
      this.zonaResponseController(res)
    }, error => console.log(error))

    this.submitted = false;
  }

  //=============Crear la rama==============
  modificarRama() {
    let ramaInfo = this.ramaForm.getRawValue();

    this.submittedRama = true;
    if (this.ramaForm.invalid) return;


    console.log(ramaInfo);
    this.ramaService.crearRama(ramaInfo).subscribe(res => {
      console.log(res);
      this.ramaResponseController(res)
    }, error => console.log(error))

    this.submitted = false;
  }

  zonaResponseController = (res) => {
    this.toastr.clear();
    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      this.toastr.success("La solicitud se realizó con éxito", 'Zona Agregada', { timeOut: 2000 });
      console.log("Éxito");
      this.getZonas();
    }
  }

  ramaResponseController = (res) => {
    this.toastr.clear();
    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      this.toastr.success("La solicitud se realizó con éxito", 'Rama Agregada', { timeOut: 2000 });
      console.log("Éxito");
    }
  }

}
