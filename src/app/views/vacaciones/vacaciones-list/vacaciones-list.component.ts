import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { VacacionService } from '../../../services/tramites/vacacion.service';
import { Vacaciones } from '../../../models/vacaciones';

@Component({
  selector: 'app-vacaciones-list',
  templateUrl: './vacaciones-list.component.html',
  styleUrls: ['./vacaciones-list.component.scss'],
  providers: [VacacionService],
})
export class VacacionesListComponent implements OnInit {
  ELEMENT_DATA: Vacaciones[];
  displayedColumns: string[] = [
    'idVaca',
    'idPers',
    'fechinicVaca',
    'fechFinVaca',
    'descVaca',
    'motiVaca',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Vacaciones>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private vacacionService: VacacionService) { }

  ngOnInit(): void {
    this.obtenerVacacion();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerVacacion() {
    let vacacion = this.vacacionService.obtenerAllVacaciones();
    vacacion.subscribe((report) => (this.dataSource.data = report as Vacaciones[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
