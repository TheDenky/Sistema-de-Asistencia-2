import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
  providers: [UsuarioService],
})
export class UsuarioListComponent implements OnInit {
  ELEMENT_DATA: Usuario[];
  displayedColumns: string[] = [
    'idPers',
    'usuaUsua',
    'passUsua',
    'tipoUsua',
    'estaUsua',
    'ACTION',
  ];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuarioService) { }
  usuarioUno: any = [];

  ngOnInit(): void {
    this.obtenerUsuario();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerDATOSUSUARIO();
  }
  public obtenerUsuario() {
    let usua = this.usuarioService.getUsuario();
    usua.subscribe((report) => (this.dataSource.data = report as Usuario[]));
  }
  public usuarioObtener(id: string) {
    this.usuarioService.usuarioget(id).subscribe(
      (res) => {
        console.log(res);
        this.usuarioUno = res;
      },
      (err) => console.error(err)
    );
  }
  obtenerDATOSUSUARIO(){
    let datosUsuario = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(datosUsuario.idPers);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
