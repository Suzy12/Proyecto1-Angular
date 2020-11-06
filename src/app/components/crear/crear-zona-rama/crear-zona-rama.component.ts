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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getZonas();
    this.zonaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
    this.ramaForm = this.formBuilder.group({
      idZona: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  get form() { return this.zonaForm.controls }
  
  get formRama() { return this.ramaForm.controls }

  public getZonas() {
    this.zonas = [];
    this.zonaService.getAllZonas().subscribe(
      res => {
        let zonasTemp: any = res.body;
        if (zonasTemp.success == false) {
          this.toastr.error("Vuelva a intentar", 'Error', { timeOut: 5000 });
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

  modificarZona(){
    let zonaInfo = this.zonaForm.getRawValue();
    console.log(zonaInfo);
    this.zonaService.crearZona(zonaInfo).subscribe(res => {
      console.log(res);
      this.zonaResponseController(res)
    }, error => console.log(error))
  }

  modificarRama(){
    let ramaInfo = this.ramaForm.getRawValue();
    console.log(ramaInfo);  
    this.ramaService.crearRama(ramaInfo).subscribe(res => {
      console.log(res);
      this.ramaResponseController(res)
    }, error => console.log(error))
  }

  zonaResponseController = (res) => {
    this.toastr.clear();
    if (res.body.success == false) {
      this.toastr.error(res.body.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      this.toastr.success("La solicitud se realizó con éxito", 'Zona Agregada', {timeOut: 2000});
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
      this.toastr.success("La solicitud se realizó con éxito", 'Rama Agregada', {timeOut: 2000});
      console.log("Éxito"); 
      this.getZonas();
    }
  }

}
