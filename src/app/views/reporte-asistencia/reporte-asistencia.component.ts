import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styleUrls: ['./reporte-asistencia.component.scss']
})
export class ReporteAsistenciaComponent implements OnInit {
  
  public USER: any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  personal: any = [{
    idPers: 1,
    dniPers: '3652145',
    apelPatePers: 'apellido',
    apelMatePers: 'materno',
    nombPers: 'miName',
    cargPers: 'Docente',
    contLaboPers: 'Nombrado',
    jornLaboPers: 40,
    fotoPers: null,
  },
  {
    idPers: 2,
    dniPers: '5214621',
    apelPatePers: 'Mamani',
    apelMatePers: 'Gonzales',
    nombPers: 'Juan',
    cargPers: 'Director',
    contLaboPers: 'Nombrado',
    jornLaboPers: 32,
    fotoPers: null,
  }];
  constructor() { }

  ngOnInit(): void {
    this.obtenerDATOSUSUARIO();
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

}
