import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { GrupoService } from '../../../services/grupos/grupo.service'
import { ToastrService } from 'ngx-toastr';
import { MiembroService } from '../../../services/miembros/miembro.service'
import { MovimientoService } from '../../../services/movimientos/movimiento.service';

@Component({
  selector: 'app-registrar-movimiento',
  templateUrl: './registrar-movimiento.component.html',
  styleUrls: ['./registrar-movimiento.component.scss']
})
export class RegistrarMovimientoComponent implements OnInit {

  firstSlide: Boolean = true;
  secondSlide: Boolean = false;
  thirdSlide: Boolean = false;
  movimientoForm: FormGroup;
  estructuraForm: FormGroup;
  telefonos: any = [''];
  fileData: File = null;
  previewUrl: any = null;
  encodedLogo = '';
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private movimientoService: MovimientoService,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.movimientoForm = this.formBuilder.group({
      cedulaJuridica: ['', [Validators.required]],
      idAsesor: ['', [Validators.required]],
      nombreMovimiento: ['', [Validators.required]],
      direccionWeb: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      provinciaMovimiento: ['', [Validators.required]],
      cantonMovimiento: ['', [Validators.required]],
      distritoMovimiento: ['', [Validators.required]],
      senasMovimiento: ['', [Validators.required]],
      telefonos: [this.telefonos, [Validators.required]],
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      canton: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      senas: ['', [Validators.required]]
    });
    this.estructuraForm = this.formBuilder.group({
      idMovimiento: ['', [Validators.required]],
      nombreZona: ['', [Validators.required]],
      nombreRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      idMiembro: ['', [Validators.required]],
      nombreMiembro: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      canton: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      senas: ['', [Validators.required]],
      posible_monitor: true,
      isMonitor: true
    });
  }

  get form() { return this.movimientoForm.controls } //form de crear movimiento
  get formEstructura() { return this.estructuraForm.controls } //form de crear estructura base del movimiento

  //============MultiStep Form: Next Step===============
  nextSlide() {
    if (this.firstSlide == true) {
      this.firstSlide = false;
      this.secondSlide = true;
      this.thirdSlide = false;
    } else {
      this.firstSlide = false;
      this.secondSlide = false;
      this.thirdSlide = true;
    }
  }


  //=============MultiStep Form: Previous Step===============
  previousSlide() {
    if (this.secondSlide == true) {
      this.firstSlide = true;
      this.secondSlide = false;
      this.thirdSlide = false;
    } else {
      this.firstSlide = false;
      this.secondSlide = true;
      this.thirdSlide = false;
    }
  }

  //============Tabla de Telefonos=================
  addTelefono() {
    this.telefonos.push('');
  }

  removeTelefono(i) {
    this.telefonos.splice(i, 1);
  }

  updateTelefonos(i, telefono) {
    this.telefonos[i] = telefono;
  }

  //=============Procesar Imagen Seleccionada===============
  processImage = (imageFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    }

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  });

  readLogo = (event) => {
    this.processImage(event.target.files[0]).then((encodedImage: string) => {
      this.encodedLogo = encodedImage;
    });
    this.preview(event);
  }

  //Preview del Logo
  preview(fileInput: any) {
    // Show preview image
    this.fileData = <File>fileInput.target.files[0];
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }


  //=============Crear Movimiento===============
  crearMovimiento() {
    let movimientoInfo = this.movimientoForm.getRawValue();
    let estructuraInfo = this.estructuraForm.getRawValue();
    if (movimientoInfo.idAsesor == estructuraInfo.idMiembro) {
      this.toastr.error("No puede indicar el mismo miembro como asesor y como monitor del grupo", 'Advertencia', { timeOut: 10000 });
      return;
    }

    if (this.encodedLogo == '') {
      this.toastr.error("Por favor inidique un logo para el movimeinto", 'Advertencia', { timeOut: 10000 });
      return;
    }
    for (let tel of this.telefonos) {
      if (tel == "") {
        this.toastr.error("Por favor complete todos lo campos de teléfonos del movimiento", 'Advertencia', { timeOut: 10000 });
        return;
      }
    }

    estructuraInfo.idMovimiento = movimientoInfo.cedulaJuridica;
    movimientoInfo.logo = this.encodedLogo;
    this.movimientoForm.controls['logo'].setValue(this.encodedLogo);
    this.estructuraForm.controls['idMovimiento'].setValue(movimientoInfo.cedulaJuridica);


    this.submitted = true;
    if (this.movimientoForm.invalid) {
      this.toastr.error("Por favor llene todos los campos solicitados", 'Advertencia', { timeOut: 10000 });
      return;
    }
    if (this.estructuraForm.invalid) if (this.movimientoForm.invalid) {
      this.toastr.error("Por favor llene todos los campos solicitados", 'Advertencia', { timeOut: 10000 });
      return;
    }

    console.log(movimientoInfo);
    console.log(estructuraInfo);

    this.movimientoService.crearMovimiento(movimientoInfo).subscribe(res => { //Step 1: se crea el movimiento
      console.log(res);
      this.toastr.clear();
      let response: any = res.body
      if (response.success == false) {
        this.toastr.error(response.error.message, 'Error', { timeOut: 5000 });
        console.log("Error");
        return;
      } else {
        this.movimientoService.crearEstructuraMovimiento(estructuraInfo).subscribe(res => { //Step 2: Crear Estructura Base
          console.log(res);
          this.toastr.clear();
          let response: any = res.body
          if (response.success == false) {
            this.toastr.error(response.error.message, 'Error', { timeOut: 5000 });
            console.log("Error");
            return;
          } else {
            this.toastr.success("La solicitud se realizó con éxito", 'Movimiento Creado', { timeOut: 1000 });
            console.log("Éxito");
          }
        }, error => console.log(error));
      }
    }, error => console.log(error));

    //Resetear Forms
    this.movimientoForm.reset();
    this.estructuraForm.reset();
    this.encodedLogo = '';
    this.previewUrl = null;
    this.fileData = null;
    this.telefonos = [''];
    this.movimientoForm.controls['telefonos'].setValue(this.telefonos);
    this.estructuraForm.controls['isMonitor'].setValue(true);
    this.estructuraForm.controls['posible_monitor'].setValue(true);

    this.submitted = false;
  }


}
