import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { LicenciaService } from '../../../services/tramites/licencia.service';
import { Licencia } from '../../../models/licencia';

@Component({
  selector: 'app-licencia-list',
  templateUrl: './licencia-list.component.html',
  styleUrls: ['./licencia-list.component.scss'],
  providers: [LicenciaService],
})
export class LicenciaListComponent implements OnInit {
  ELEMENT_DATA: Licencia[];
  displayedColumns: string[] = [
    'idlice',
    'idPers',
    'tipoLice',
    'motiLice',
    'fechIniLice',
    'fechFinLice',
    'obseLice',
  ];
  dataSource = new MatTableDataSource<Licencia>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private licenciaService: LicenciaService) { }

  ngOnInit(): void {
    this.obtenerLicencia();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerLicencia() {
    let licencia = this.licenciaService.getLiceNombres();
    licencia.subscribe((report) => (this.dataSource.data = report as Licencia[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
