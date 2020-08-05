import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal.service';

@Component({
  selector: 'app-pers-list',
  templateUrl: './pers-list.component.html',
  styleUrls: ['./pers-list.component.scss'],
  providers: [PersonalService],
})
export class PersListComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  displayedColumns: string[] = [
    'dniPers',
    'nombPers',
    'apelPatePers',
    'apelMatePers',
    'cargPers',
    'contLaboPers',
    'jornLaboPers',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Personal>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private personalService: PersonalService) {}
  unapersona: any = [];

  ngOnInit(): void {
    this.obtenerPersonal();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public obtenerPersonal() {
    let resp = this.personalService.getPersonal();
    resp.subscribe((report) => (this.dataSource.data = report as Personal[]));
  }
  public obtenerUnPersonal(id: string) {
    this.personalService.getOnePersonal(id).subscribe(
      (res) => {
        console.log(res);
        this.unapersona = res;
      },
      (err) => console.error(err)
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
