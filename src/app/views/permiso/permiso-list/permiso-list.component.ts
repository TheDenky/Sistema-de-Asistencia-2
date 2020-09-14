import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PermisoService } from '../../../services/tramites/permiso.service';
import { Permiso } from '../../../models/permiso';

@Component({
  selector: 'app-permiso-list',
  templateUrl: './permiso-list.component.html',
  styleUrls: ['./permiso-list.component.scss'],
  providers: [PermisoService],
})
export class PermisoListComponent implements OnInit {
  ELEMENT_DATA: Permiso[];
  displayedColumns: string[] = [
    'idPerm',
    'idPers',
    'horaPerm',
    'minutoPerm',
    'fechaPerm',
    'obsePerm',
    'motiPerm',
  ];
  dataSource = new MatTableDataSource<Permiso>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private permisoService: PermisoService) { }

  ngOnInit(): void {
    this.obtenerPermisoNombre();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerPermisoNombre() {
    let asi = this.permisoService.obperNombre();
    asi.subscribe((report) => (this.dataSource.data = report as Permiso[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
