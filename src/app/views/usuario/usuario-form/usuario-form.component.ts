import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal.service';
import { InstitucionService } from '../../../services/institucion.service';
import { Institucion } from '../../../models/institucion';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers: [PersonalService, InstitucionService],
})
export class UsuarioFormComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  ELEMENT_DATA2: Institucion[];
  datos: any = {
    idP: 0,
    dniP: '',
    idI: 0,
    codI: '',
  }
  usuario: Usuario = {
    idPers: 0,
    idInst: 0,
    usuaUsua: '',
    passUsua: '',
    tipoUsua: '',
    estaUsua: '',
  };
  displayedColumns: string[] = [
    'dniPers',
    'nombPers',
    'apelPatePers',
    'apelMatePers',
    'cargPers',
    'ACTION',
  ];
  displayedColumns2: string[] = [
    'codiModuInst',
    'nombInst',
    'niveEduInst',
    'modaInst',
    'turnInst',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Personal>(this.ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<Institucion>(this.ELEMENT_DATA2);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  constructor(private personalService: PersonalService, private instservice: InstitucionService,
    private usuarioService: UsuarioService,
    private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerinst();
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
  }
  public obtenerPersonal() {
    let resp = this.personalService.getPersonal();
    resp.subscribe((report) => (this.dataSource.data = report as Personal[]));
  }
  public obtenerinst() {
    let ins = this.instservice.getinst();
    ins.subscribe((report) => (this.dataSource2.data = report as Institucion[]));
  }
  public PersonalSeleccionado(id, dni){
    this.datos.idP = id;
    this.datos.dniP = dni;
    this.usuario.idPers = id;
    //console.log(this.vacaciones);
  }
  public InstitucionSeleccionado(id, cod){
    this.datos.idI = id;
    this.datos.codI = cod;
    this.usuario.idInst = id;
    console.log(id,cod);
  }
  public guardarUsuario(){
    console.log(this.usuario);
    this.usuarioService.saveUsuario(this.usuario).subscribe(
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
      title: 'Usuario Guardado Exitosamente !',
      showConfirmButton: false,
      timer: 4000,
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

}
