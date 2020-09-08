import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReporteService } from '../../services/reporte.service';
import { Reportes } from '../../models/reporte';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {
  ELEMENT_DATA: Reportes[];
  displayedColumns: string[] = ['nomcolegio', 'nombre', 'Diasasis', 'mes'];
  dataSource = new MatTableDataSource<Reportes>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reporte: ReporteService) {}
  reportes: any = [];

  ngOnInit(): void {
    this.obtenerreporte();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerreporte() {
    let resp = this.reporte.reporte();
    resp.subscribe((report) => (this.dataSource.data = report as Reportes[]));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
