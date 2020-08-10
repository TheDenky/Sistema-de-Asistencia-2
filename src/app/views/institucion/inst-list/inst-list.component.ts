import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { InstitucionService } from '../../../services/institucion.service';
import { Institucion } from '../../../models/institucion';

@Component({
  selector: 'app-inst-list',
  templateUrl: './inst-list.component.html',
  styleUrls: ['./inst-list.component.scss'],
  providers: [InstitucionService],
})
export class InstListComponent implements OnInit {
  ELEMENT_DATA: Institucion[];
  displayedColumns: string[] = [
    'codiModuInst',
    'nombInst',
    'numeInst',
    'niveEduInst',
    'modaInst',
    'turnInst',
    'direInst',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Institucion>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private instservice: InstitucionService) {}
  insti: any = [];

  ngOnInit(): void {
    this.obtenerinst();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerinst() {
    let ins = this.instservice.getinst();
    ins.subscribe((report) => (this.dataSource.data = report as Institucion[]));
  }
  editInstitucion(id: string) {
    console.log(id);
  }
  public instob(id: string) {
    this.instservice.instget(id).subscribe(
      (res) => {
        console.log(res);
        this.insti = res;
      },
      (err) => console.error(err)
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
