import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { AsistenciaSService } from '../../services/asistencia-s.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [AsistenciaSService],
})
export class LogsComponent implements OnInit {
  ELEMENT_DATA: Log[];
  displayedColumns: string[] = [
    'nombInst',
    'nombPers',
    'apelPatePers',
    'apelMatePers',
    'fechaLog',
    'estadoAsisNuev',
    'estadoAsisViej',
    'acciLog',
  ];
  dataSource = new MatTableDataSource<Log>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private asisService: AsistenciaSService) { }

  ngOnInit(): void {
    this.obtenerAsis();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerAsis() {
    let asi = this.asisService.getLog();
    asi.subscribe((report) => (this.dataSource.data = report as Log[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
