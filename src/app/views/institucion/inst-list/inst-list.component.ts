import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  codModular: string;
  nombre: string;
  direccion: string;
  numero: string;
  nivel: string;
  modalidad: string;
  turno: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-inst-list',
  templateUrl: './inst-list.component.html',
  styleUrls: ['./inst-list.component.scss'],
})
export class InstListComponent implements OnInit {
  displayedColumns: string[] = [
    'codModular',
    'nombre',
    'direccion',
    'numero',
    'nivel',
    'modalidad',
    'turno',
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
