import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-miembro',
  templateUrl: './registrar-miembro.component.html',
  styleUrls: ['./registrar-miembro.component.scss']
})
export class RegistrarMiembroComponent implements OnInit {

  registerForm: FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      confirmedPass: ['', [Validators.required]],
      //tipo: ['1', [Validators.required]]
    });
  }

  get form() { return this.registerForm.controls }

}
