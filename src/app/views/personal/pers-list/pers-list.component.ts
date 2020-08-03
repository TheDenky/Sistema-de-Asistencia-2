import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  DNI: string;
  Nombres: string;
  apepat: string;
  apemat: string;
  Jornada: string;
  Contrato: string;
  Cargo: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-pers-list',
  templateUrl: './pers-list.component.html',
  styleUrls: ['./pers-list.component.scss'],
})
export class PersListComponent implements OnInit {
  displayedColumns: string[] = [
    'DNI',
    'Nombres',
    'apepat',
    'apemat',
    'Cargo',
    'Contrato',
    'Jornada',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
