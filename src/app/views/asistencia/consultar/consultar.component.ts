import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { AsistenciaSService } from '../../../services/asistencia-s.service';
import { Asistencia } from '../../../models/asistencia';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
  providers: [AsistenciaSService],
})
export class ConsultarComponent implements OnInit {
  f = new Date();
  ELEMENT_DATA: Asistencia[];
  displayedColumns: string[] = [
    'idAsis',
    'idPers',
    'estaAsis',
    'fechAsis',
    'ACTION',
  ];
  asistencia: Asistencia = {
    idAsis: 0,
    idPers: 0,
    idInst: 0,
    estaAsis: true,
    estado: "",
    fechAsis: null,
  };
  dataSource = new MatTableDataSource<Asistencia>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private asisService: AsistenciaSService, private toastr: ToastrService, private router: Router) { }
  asist: any = [];

  ngOnInit(): void {
    this.obtenerAsisNombres();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerAsisNombres() {
    let asi = this.asisService.getAsisNombres();
    asi.subscribe((report) => (this.dataSource.data = report as Asistencia[]));
  }
  editAsistencia(id: string) {
    console.log(id);
  }
  obtenerAsistencia(idAsis, fecha, estado, idInst, idPers){
    this.asistencia.idAsis = idAsis;
    this.asistencia.fechAsis = fecha;
    this.asistencia.estado = estado;
    this.asistencia.estaAsis = estado;
    this.asistencia.idInst = idInst;
    this.asistencia.idPers = idPers;
  }
  modAsistencia(){
    console.log('he cambiado');
    if(this.asistencia.estado == '1'){
      this.asistencia.estado = '0';
      this.asistencia.estaAsis = false;
    }else{
      this.asistencia.estado = '1';
      this.asistencia.estaAsis = true;
    }
  }
  modificarAsistencia(){
    delete this.asistencia.estado;
    var fecha: string = this.f.getFullYear() + "/" + (this.f.getMonth() +1) + "/" + this.f.getDate() ;
    this.asistencia.fechAsis = fecha;
    console.log(fecha);
    console.log(this.asistencia);
    this.updateAsistencia();
    this.router.navigate(['/asistencia/list']);
  }
  updateAsistencia() {
    //console.log(this.institucion)
    this.asisService
      .updateAsistenciaNuevo(this.asistencia.idAsis, this.asistencia)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Asistencia Actualizada', 'Éxitoso');
          this.router.navigate(['/asistencia/list']);
         // this.toastr.success('Personal Modificado', 'Éxitoso');
          //this.FlashMensaje.show('Personal Modificado correctamente !', {cssClass: 'alert-primary', timeout: 5000});
          //this.router.navigate(['/personal/list']);
        },
        (err) => {
          //this.toastr.error('Ha ocurrido algún error', 'Fallido');
          this.toastr.error('Ha ocurrido algún error', 'Fallido');
          console.error(err)
        } 
      );
  }
  public asisob(id: string) {
    this.asisService.asisget(id).subscribe(
      (res) => {
        console.log(res);
        this.asist = res;
      },
      (err) => console.error(err)
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
