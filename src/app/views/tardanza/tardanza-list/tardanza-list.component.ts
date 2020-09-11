import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TardanzaService } from '../../../services/tardanza.service';
import { Tardanza } from '../../../models/tardanza';

@Component({
  selector: 'app-tardanza-list',
  templateUrl: './tardanza-list.component.html',
  styleUrls: ['./tardanza-list.component.scss'],
  providers: [TardanzaService],
})
export class TardanzaListComponent implements OnInit {
  ELEMENT_DATA: Tardanza[];
  displayedColumns: string[] = [
    'idtard',
    'idPers',
    'horaTard',
    'minuTard',
    'fechaTard',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Tardanza>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tardanzaService: TardanzaService) { }

  ngOnInit(): void {
    this.obtenerTardancia();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerTardancia() {
    let asi = this.tardanzaService.getAllTardanza();
    asi.subscribe((report) => (this.dataSource.data = report as Tardanza[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
