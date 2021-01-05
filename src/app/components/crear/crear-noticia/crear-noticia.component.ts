import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { ZonaService } from '../../../services/zonas/zona.service';
import { RamaService } from '../../../services/ramas/rama.service';
import { GrupoService } from '../../../services/grupos/grupo.service';
import { NoticiasService } from '../../../services/noticias/noticias.service';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.scss']
})

//Reference: https://stackblitz.com/edit/angular-multi-file-upload-preview?file=app%2Fapp.module.ts

export class CrearNoticiaComponent implements OnInit {

  urls = [];
  crearForm: FormGroup;
  movimiento = this.storage.get('current-user-movimiento');
  miembro = this.storage.get('current-user');
  zonas: any = [];
  ramas: any = [];
  grupos: any = [];
  selectedOptionZona: any;
  selectedOptionRama: any;
  selectedOptionGrupo: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private noticiasService: NoticiasService
    ) { }

  ngOnInit(): void {
    this.getZonas();
    this.crearForm = this.formBuilder.group({
      idMovimiento: this.movimiento,
      idEmisor: this.miembro,
      idZona: ['', [Validators.required]],
      idRama: ['', [Validators.required]],
      idGrupo: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
      imagenes: [''],
      tipo: ['checkMovimiento', [Validators.required]],
    });

  }

  get form() { return this.crearForm.controls }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  public getZonas() {
    this.zonaService.zonasMiembro(this.movimiento, this.miembro).subscribe(
      res => {
        let zonasTemp: any = res.body;
        if (zonasTemp.success == false) {
          this.toastr.error(zonasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(zonasTemp);
          Object.values(zonasTemp.zonas).forEach(element => {
            this.zonas.push(element);
          });
        }
      },
      err => console.log(err)
    );
  }

  getRamas(newZona) {
    this.ramas = [];
    this.grupos = [];
    this.ramaService.getTodasRamasMiembro(this.movimiento, newZona, this.miembro).subscribe(
      res => {
        let ramasTemp: any = res.body;
        if (ramasTemp.success == false) {
          this.toastr.error(ramasTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(res);
          Object.values(ramasTemp.ramas).forEach(element => {
            this.ramas.push(element);
          });
        }
      },
      err => console.log(err)
    )
    if (this.selectedOptionRama != undefined)
      this.getGrupos(this.selectedOptionRama);
  }

  getGrupos(newRama) {
    this.grupos = [];
    this.grupoService.consultarGruposDeLider(this.movimiento, this.selectedOptionZona, newRama, this.miembro).subscribe(
      res => {
        let gruposTemp: any = res.body;
        if (gruposTemp.success == false) {
          this.toastr.error(gruposTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          console.log(gruposTemp);
          Object.values(gruposTemp.grupos).forEach(element => {
            this.grupos.push(element);
          });
        }
      },
      err => console.log(err)
    )
  }

  crearNoticia(){
    this.crearForm.controls['imagenes'].setValue(this.urls);

    this.submitted = true;
    if (this.crearForm.invalid) {
      return;
    }

    let noticiaInfo = this.crearForm.getRawValue();
    let nodo = noticiaInfo.tipo;
    if(nodo === "checkMovimiento"){
      noticiaInfo.tipo = "MOVIMIENTO";
    }else if(nodo === "checkZona"){
      noticiaInfo.tipo = "ZONA";
    }else if(nodo === "checkRama"){
      noticiaInfo.tipo = "RAMA";
    }else{
      noticiaInfo.tipo = "GRUPO";
    }

    console.log(noticiaInfo);

    this.noticiasService.crearNoticia(noticiaInfo).subscribe(
      res => {
        let response: any = res.body;
        console.log(response);
        if (response.success == false) {
          this.toastr.error(response.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");
        } else {
          this.toastr.success("La solicitud se realizó con éxito", 'Noticia Creada', { timeOut: 5000 });
          console.log("Éxito");
          this.crearForm.reset();
          this.urls = [];
        }
      },
      err => console.log(err)
    )

    this.submitted = false;
    
  }

}
