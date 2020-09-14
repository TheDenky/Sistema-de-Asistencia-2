import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal.service';
import { Vacaciones } from 'src/app/models/vacaciones';
import { VacacionService } from 'src/app/services/tramites/vacacion.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacaciones-form',
  templateUrl: './vacaciones-form.component.html',
  styleUrls: ['./vacaciones-form.component.scss'],
  providers: [PersonalService],
})
export class VacacionesFormComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  datos: any = {
    idP: 0,
    dniP: ''
  }
  vacaciones: Vacaciones = {
    idVaca: 0,
    idPers: 0,
    fechinicVaca: null,
    fechFinVaca: null,
    descVaca: 0,
    motiVaca: '',
  };
  displayedColumns: string[] = [
    'dniPers',
    'nombPers',
    'apelPatePers',
    'apelMatePers',
    'cargPers',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Personal>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private personalService: PersonalService, private vacacionService: VacacionService,
    private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerPersonal() {
    let resp = this.personalService.getPersonal();
    resp.subscribe((report) => (this.dataSource.data = report as Personal[]));
  }
  public PersonalSeleccionado(id, dni){
    this.datos.idP = id;
    this.datos.dniP = dni;
    this.vacaciones.idPers = id;
    //console.log(this.vacaciones);
  }
  public guardarVacaciones(){
    delete this.vacaciones.idVaca;
    console.log(this.vacaciones);
    this.vacacionService.saveVacacion(this.vacaciones).subscribe(
      (res) => {
        console.log(res);
        this.showModal();
        //this.toastr.success('Tardanza Guardada', 'Éxitoso');
        this.router.navigate(['/vacaciones/list']);
      },
      (err) => {
        this.toastr.error('Ha ocurrido algún error', 'Fallido');
        console.error(err)
      });
  }
  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vacación Guardada Exitosamente !',
      showConfirmButton: false,
      timer: 4000,
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
