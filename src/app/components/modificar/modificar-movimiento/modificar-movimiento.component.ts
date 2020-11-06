import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MovimientoService } from '../../../services/movimientos/movimiento.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-modificar-movimiento',
  templateUrl: './modificar-movimiento.component.html',
  styleUrls: ['./modificar-movimiento.component.scss']
})
export class ModificarMovimientoComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  movimientoForm:  FormGroup;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  movimiento: any = {};
  submitted: Boolean = false;
  routeState: any;
  encodedLogo = '';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.routeState = this.router.getCurrentNavigation().extras.state;
        if (this.routeState) {
          console.log(this.routeState);
          this.movimiento = this.routeState;
        }
      }
    }

  ngOnInit(): void {
    this.movimientoForm = this.formBuilder.group({
      idMovimiento: this.movimiento.cedula_juridica,
      idAsesor: this.movimiento.idAsesor,
      nombre: [this.movimiento.nombre, [Validators.required]],
      direccionWeb: [this.movimiento.direccionWeb, [Validators.required]],
      logo: ['', [Validators.required]],
      pais: this.movimiento.pais,
      provincia: [this.movimiento.provincia, [Validators.required]],
      canton: [this.movimiento.canton, [Validators.required]],
      distrito: [this.movimiento.distrito, [Validators.required]],
      senas: [this.movimiento.senas, [Validators.required]]
    });
  }

  

  get form() { return this.movimientoForm.controls }

  modificar = () => {

    let movimientoInfo = this.movimientoForm.getRawValue();
    if(this.encodedLogo == ''){
      movimientoInfo.logo = this.movimiento.logo;
    }else{
      movimientoInfo.logo = this.encodedLogo;
    }

    this.submitted = true;

    console.log(movimientoInfo);

    if (this.movimientoForm.invalid) return;


   this.movimientoService.modificarMovimiento(movimientoInfo).subscribe(res => {
      console.log(res.body);
      this.responseController(res);
    }, error => console.log(error))

    this.submitted = false;
  }

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

  responseController = (res) => {
    this.toastr.clear();
    if(res.body.success == false){
      this.toastr.error(res.body.error.message, 'Error', {timeOut: 5000});
      console.log("Error");
    }else{
      this.toastr.success("La solicitud se realizó con éxito", 'Movimiento modificado', {timeOut: 2000});
      console.log("Éxito");
    }
  }



}
