import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PermisoService } from '../../services/tramites/permiso.service';
import { Permiso } from '../../models/permiso';

@Component({
  selector: 'app-mis-permisos',
  templateUrl: './mis-permisos.component.html',
  styleUrls: ['./mis-permisos.component.scss'],
  providers: [PermisoService],
})
export class MisPermisosComponent implements OnInit {
  ELEMENT_DATA: Permiso[];
  public USER: any;
  displayedColumns: string[] = [
    'idPers',
    'horaPerm',
    'minutoPerm',
    'fechaPerm',
    'obsePerm',
    'motiPerm',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Permiso>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private permisoService: PermisoService) { }

  ngOnInit(): void {
    this.obtenerDATOSUSUARIO();
    this.obtenerPermiso();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerPermiso() {
    let asi = this.permisoService.obperUser(this.USER.idPers);
    asi.subscribe((report) => (this.dataSource.data = report as Permiso[]));
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
