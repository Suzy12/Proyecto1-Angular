import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { LoginService } from '../../services/login/login.service'
import {  LoginGuard } from '../../services/login/login.guard';
import { MovimientoService } from '../../services/movimientos/movimiento.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  loginForm: FormGroup
  submitted: Boolean = false
  loading: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: LoginService,
    private guard: LoginGuard,
    private movimientoService: MovimientoService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService
    ) {
    
   }
   
   ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
       id: ['', [Validators.required]],
       pass: ['', [Validators.required]]
       //tipo: ['1', [Validators.required]]
    });
  }

  get form() { return this.loginForm.controls }

  login = () => {
    let loginInfo = this.loginForm.getRawValue();

    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.authService.login(loginInfo).subscribe(res => {
      this.authSuccess(res)
    }, error => this.authError(error))

    this.submitted = false;
  }

  authSuccess = (res) => {
    this.toastr.clear();
    if(res.body.success == false){
      this.toastr.error("La combinación no es correcta", 'Error', {timeOut: 5000});
      console.log("Error");
    }else{
      this.toastr.success(`Bienvenido`, 'Usuario autenticado', {timeOut: 2000});
      console.log("Bienvenido");
      
      let loginInfo = this.loginForm.getRawValue();
      //this.guard.setSession(res.body.token);
      this.storage.set('current-user', loginInfo.id);
      this.storage.set('current-user-role', "1");
      this.loading = false;
      this.loginForm.reset();
      
      this.movimientoService.getSession().subscribe(res => {
        console.log(res);
      }, error => console.log(error))
      
      if (this.storage.get('current-user-role') == 1)
        this.router.navigate(['/perfil']);
      }
  }

  authError = (err) => {
    this.toastr.clear()
    this.toastr.error(err.error.msg, 'Error');
    console.log(err.error.msg);
    this.loading = false;
  }

}
