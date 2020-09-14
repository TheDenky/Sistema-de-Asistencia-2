import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';

import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styleUrls: ['./reporte-asistencia.component.scss'],
  providers: [PersonalService],
})
export class ReporteAsistenciaComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  public USER: any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private personalService: PersonalService) { }

  ngOnInit(): void {
    this.obtenerPersonalAsistencia();
    this.obtenerDATOSUSUARIO();
  }
  public obtenerPersonalAsistencia() {
    this.personalService.getPersonalAsistencia().subscribe(
      (res) => {
        this.ELEMENT_DATA = res as Personal[];
        console.log(this.ELEMENT_DATA);
      },
      (err) => console.error(err)
    );
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
    xlsx.writeFile(wb, 'Reporte_Asistencia.xlsx');
   }

}
