import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-reporte',
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.scss']
})
export class CrearReporteComponent implements OnInit {

  crearForm: FormGroup;
  movimiento = this.storage.get('current-user-movimiento');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      tipo: ['checkGeneral', [Validators.required]],
    });
  }

  crearReporte(){}


}
