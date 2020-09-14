import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal.service';
import { Licencia } from 'src/app/models/licencia';
import { LicenciaService } from 'src/app/services/tramites/licencia.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licencia-form',
  templateUrl: './licencia-form.component.html',
  styleUrls: ['./licencia-form.component.scss'],
  providers: [PersonalService],
})
export class LicenciaFormComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  datos: any = {
    idP: 0,
    dniP: ''
  }
  licencia: Licencia = {
    idlice: 0,
    idPers: 0,
    tipoLice: '',
    motiLice: '',
    fechIniLice: null,
    fechFinLice: null,
    obseLice: '',
    docuLice: null,
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

  constructor(private personalService: PersonalService, private licenciaService: LicenciaService,
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
    this.licencia.idPers = id;
    //console.log(this.vacaciones);
  }
  public guardarLicencia(){
    delete this.licencia.idlice;
    console.log(this.licencia);
    this.licenciaService.saveLicencia(this.licencia).subscribe(
      (res) => {
        console.log(res);
        this.showModal();
        //this.toastr.success('Tardanza Guardada', 'Éxitoso');
        //this.router.navigate(['/vacaciones/list']);
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
      title: 'Licencia Guardada Exitosamente !',
      showConfirmButton: false,
      timer: 4000,
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
