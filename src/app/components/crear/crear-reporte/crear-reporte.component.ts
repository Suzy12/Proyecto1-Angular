import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { AportesService } from '../../../services/aportes/aportes.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-reporte',
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.scss']
})
export class CrearReporteComponent implements OnInit {

  crearForm: FormGroup;
  movimiento = this.storage.get('current-user-movimiento');
  ced = this.storage.get('current-user');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private aportesService: AportesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      tipo: ['checkGeneral', [Validators.required]],
    });
  }

  public openConfirmationDialog(confirmar) {
    this.modalService.open(confirmar, { centered: true });
  }

  public accept() {
    let reporteInfo = this.crearForm.getRawValue();
    let tipo = reporteInfo.tipo;
    if(tipo == "checkGeneral"){
      this.aportesService.generarReporteGeneral(this.movimiento, this.ced).subscribe(
        res => {
          let responseTemp: any = res.body;
          if (responseTemp.success == true){
            this.toastr.success("La solicitud se realizó con éxito", 'Reporte General Creado', { timeOut: 5000 });
            console.log("Success"); 
          }else{
            this.toastr.error(responseTemp.error.message, 'Error', { timeOut: 5000 });
            console.log("Error");       
          }
        }
      );
    }else{
      this.aportesService.generarReporteTipado(this.movimiento, this.ced).subscribe(
        res => {
          let responseTemp: any = res.body;
          if (responseTemp.success == true){
            this.toastr.success("La solicitud se realizó con éxito", 'Reporte Tipado Creado', { timeOut: 5000 });
            console.log("Success"); 
          }else{
            this.toastr.error(responseTemp.error.message, 'Error', { timeOut: 5000 });
            console.log("Error");       
          }
        }
      );
    }
    
    this.modalService.dismissAll();
  }


}
