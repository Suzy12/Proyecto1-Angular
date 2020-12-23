import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiembroService } from '../../../services/miembros/miembro.service'

@Component({
  selector: 'app-registrar-miembro',
  templateUrl: './registrar-miembro.component.html',
  styleUrls: ['./registrar-miembro.component.scss']
})
export class RegistrarMiembroComponent implements OnInit {

  registerForm: FormGroup;
  submitted: Boolean = false;
  msg:String;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private memService: MiembroService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      confirmedPass: ['', [Validators.required]],
      //tipo: ['1', [Validators.required]]
    });
  }

  get form() { return this.registerForm.controls }

  clickEvent(){
    let registerInfo = this.registerForm.getRawValue();
    let mem = registerInfo.id;
    let pass = registerInfo.pass;
    let confPass = registerInfo.confirmedPass;
    console.log(pass)
    console.log(confPass)
    if(pass == confPass){
      //console.log("Entered")
      this.memService.modificarContra({idMiembro: mem, contrasena:pass}).subscribe(res =>{
        this.authResponse(res)
      })
    }
    else{
      this.toastr.error("Las contraseñas con coinciden", 'Error de constraseña', { timeOut: 5000 });
    }
    this.submitted = true;
  }

  authResponse(res){
    this.toastr.clear();
    console.log(res);
    if (res.body.success == false) {
      this.toastr.error("La cédula ya se encuentra registrada", 'Error', { timeOut: 5000 });
      console.log("Error");
    }
    else{
      this.toastr.success(`Registro completado`, 'Se registró con éxito su cuenta', { timeOut: 2000 });
      this.router.navigate(['/login']); //navegar a la pagina de perfil 
    }
  }
}
