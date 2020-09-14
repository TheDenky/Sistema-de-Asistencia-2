import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TardanzaService } from '../../services/tardanza.service';
import { Tardanza } from '../../models/tardanza';

@Component({
  selector: 'app-mis-tardanzas',
  templateUrl: './mis-tardanzas.component.html',
  styleUrls: ['./mis-tardanzas.component.scss'],
  providers: [TardanzaService],
})
export class MisTardanzasComponent implements OnInit {
  ELEMENT_DATA: Tardanza[];
  public USER: any;
  displayedColumns: string[] = [
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
    this.obtenerDATOSUSUARIO();
    this.obtenerTardancia();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerTardancia() {
    let asi = this.tardanzaService.getAllTardanzaUser(this.USER.idPers);
    asi.subscribe((report) => (this.dataSource.data = report as Tardanza[]));
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
