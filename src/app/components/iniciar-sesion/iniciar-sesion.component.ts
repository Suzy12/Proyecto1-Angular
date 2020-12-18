import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { LoginService } from '../../services/login/login.service'
import { LoginGuard } from '../../services/login/login.guard';
import { MovimientoService } from '../../services/movimientos/movimiento.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  loginForm: FormGroup;
  submitted: Boolean = false;
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

  //=============Iniciar Sesion===============
  login = () => {
    let loginInfo = this.loginForm.getRawValue();

    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.authService.login(loginInfo).subscribe(res => {
      this.authSuccess(res)
    }, error => console.log(error))

    this.submitted = false;
  }

  //=============Procesar respuesta===============
  authSuccess = (res) => {
    this.toastr.clear();
    if (res.body.success == false) {
      this.toastr.error("La combinación no es correcta", 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      this.toastr.success(`Bienvenido`, 'Usuario autenticado', { timeOut: 2000 });
      console.log("Bienvenido");
      console.log(res.body);

      let loginInfo = this.loginForm.getRawValue();
      //this.guard.setSession(res.body.token);
      this.storage.set('current-user', loginInfo.id); //guardar cedula del usuario actual
      this.storage.set('current-user-role', "1"); //guardar rol de asesor
      this.storage.set('current-user-movimiento', res.body.movimiento); //guardar id del movimiento
      this.loading = false;
      this.loginForm.reset();

      if (this.storage.get('current-user-role') == 1)
        this.router.navigate(['/perfil']); //navegar a la pagina de perfil 
    }
  }

}
