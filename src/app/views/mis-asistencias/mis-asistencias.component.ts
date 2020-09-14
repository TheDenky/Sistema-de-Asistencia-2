import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { AsistenciaSService } from '../../services/asistencia-s.service';
import { Asistencia } from '../../models/asistencia';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.scss'],
  providers: [AsistenciaSService],
})
export class MisAsistenciasComponent implements OnInit {
  ELEMENT_DATA: Asistencia[];
  public USER: any;
  displayedColumns: string[] = [
    'estaAsis',
    'fechAsis',
  ];
  dataSource = new MatTableDataSource<Asistencia>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private asisService: AsistenciaSService) { }

  ngOnInit(): void {
    this.obtenerDATOSUSUARIO();
    this.obtenerAsis();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerAsis() {
    let asi = this.asisService.getAsisUsuario(this.USER.idPers);
    asi.subscribe((report) => (this.dataSource.data = report as Asistencia[]));
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
