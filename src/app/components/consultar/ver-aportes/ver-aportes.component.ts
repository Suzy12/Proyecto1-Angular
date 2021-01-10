import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AportesService } from '../../../services/aportes/aportes.service';
import { MiembroService } from '../../../services/miembros/miembro.service';
import { ZonaService } from '../../../services/zonas/zona.service'
import { RamaService } from '../../../services/ramas/rama.service'
import { GrupoService } from '../../../services/grupos/grupo.service'

@Component({
  selector: 'app-ver-aportes',
  templateUrl: './ver-aportes.component.html',
  styleUrls: ['./ver-aportes.component.scss']
})
export class VerAportesComponent implements OnInit {

  closeResult: string;
  aportes = [];
  movimiento = this.storage.get('current-user-movimiento');
  miembro = this.storage.get('current-user');

  constructor(
    private modalService: NgbModal,
    private router: Router,
    @Inject(SESSION_STORAGE) public storage: StorageService,
    private toastr: ToastrService,
    private zonaService: ZonaService,
    private ramaService: RamaService,
    private grupoService: GrupoService,
    private miembroService: MiembroService,
    private aportesService: AportesService
  ) { }

  ngOnInit(): void {
    this.aportesService.consultarAportes(this.movimiento)
      .toPromise()
        .then(
          res => { // Success
            this.response(res);
          },
          msg => {
            console.log(msg);
          }
        );
  }

  response(res){
    let aportesTemp: any = res.body;
    if (aportesTemp.success == false) {
      this.toastr.error(aportesTemp.error.message, 'Error', { timeOut: 5000 });
      console.log("Error");
    } else {
      console.log(aportesTemp.aportes);
      Object.values(aportesTemp.aportes).reverse().forEach((element, index) => {
        this.aportes.push(element);
        let ap: any = element;
        this.getNombreMiembro(ap.id_emisor, index);
      });
    }
  }

  getNombreMiembro(id, i) {
    this.miembroService.getUnMiembroxID(this.movimiento, id).subscribe(
      res => {
        let usuarioTemp: any = res.body;
        if (usuarioTemp.success == true)
          this.aportes[i].nombreMiembro = usuarioTemp.miembro.nombre;
      }
    );
  }

  crearReporte(){
    this.router.navigate(['/crear/reporte']);
  }

  /* --------------------------------------------- */
  /* Modal Notificaciones */

  openScrollableContent(longContent, i) {
    this.modalService.open(longContent, { centered: true, scrollable: true, size: 'lg' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public openConfirmationDialog(descargar) {
    this.modalService.open(descargar, { centered: true });
  }

  public accept() {
    this.aportesService.limpiarBandejaAportes(this.movimiento).subscribe(
      res => {
        let responseTemp: any = res.body;
        if (responseTemp.success == true){
          this.toastr.success("La solicitud se realizó con éxito", 'Bandeja Limpiada', { timeOut: 5000 });
          this.aportes = [];
          console.log("Success"); 
        }else{
          this.toastr.error(responseTemp.error.message, 'Error', { timeOut: 5000 });
          console.log("Error");       
        }
      }
    );
    this.modalService.dismissAll();
  }

}
