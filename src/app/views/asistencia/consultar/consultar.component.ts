import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { AsistenciaSService } from '../../../services/asistencia-s.service';
import { Asistencia } from '../../../models/asistencia';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
  providers: [AsistenciaSService],
})
export class ConsultarComponent implements OnInit {
  ELEMENT_DATA: Asistencia[];
  displayedColumns: string[] = [
    'idAsis',
    'idPers',
    'idInst',
    'estaAsis',
    'fechAsis',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Asistencia>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private asisService: AsistenciaSService) { }
  asist: any = [];

  ngOnInit(): void {
    this.obtenerAsis();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerAsis() {
    let asi = this.asisService.getAsis();
    asi.subscribe((report) => (this.dataSource.data = report as Asistencia[]));
  }
  editAsistencia(id: string) {
    console.log(id);
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
