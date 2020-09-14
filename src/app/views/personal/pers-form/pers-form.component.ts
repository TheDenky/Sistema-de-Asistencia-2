import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../../services/personal.service';
import { Personal } from 'src/app/models/personal';
import { ActivatedRoute, Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pers-form',
  templateUrl: './pers-form.component.html',
  styleUrls: ['./pers-form.component.scss'],
})
export class PersFormComponent implements OnInit {
  personal: Personal = {
    idPers: 0,
    dniPers: '',
    apelPatePers: '',
    apelMatePers: '',
    nombPers: '',
    cargPers: '',
    contLaboPers: '',
    jornLaboPers: 0,
    fotoPers: null,
  };
  edit: boolean = false;

  constructor(
    private personalService: PersonalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public FlashMensaje: FlashMessagesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.personalService.getOnePersonal(params.id).subscribe(
        (res) => {
          console.log(res);
          this.personal = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }

  saveNewPersonal() {
    delete this.personal.idPers;
    delete this.personal.fotoPers;
    console.log(this.personal);

    this.personalService.savePersonal(this.personal).subscribe(
      (res) => {
        console.log(res);
        this.showModal();
        //this.FlashMensaje.show('Personal Guardado correctamente !', {cssClass: 'alert-success', timeout: 5000});
        //this.router.navigate(['/personal/list']);
      },
      (err) => {
        this.toastr.error('Ha ocurrido algún error', 'Fallido');
        console.error(err)
      });
  }
  updatePersonal() {
    //console.log(this.institucion)
    this.personalService
      .updatePersonal(this.personal.idPers, this.personal)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Personal Modificado', 'Éxitoso');
          //this.FlashMensaje.show('Personal Modificado correctamente !', {cssClass: 'alert-primary', timeout: 5000});
          //this.router.navigate(['/personal/list']);
        },
        (err) => {
          this.toastr.error('Ha ocurrido algún error', 'Fallido');
          console.error(err)
        } 
      );
  }
  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Personal Guardado Exitosamente !',
      showConfirmButton: false,
      timer: 4000,
    });
  }
}
