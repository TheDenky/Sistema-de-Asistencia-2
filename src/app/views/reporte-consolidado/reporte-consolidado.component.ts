import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-reporte-consolidado',
  templateUrl: './reporte-consolidado.component.html',
  styleUrls: ['./reporte-consolidado.component.scss']
})
export class ReporteConsolidadoComponent implements OnInit {
  @ViewChild('Reporte_Consolidado', { static: false }) Reporte_Consolidado: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.Reporte_Consolidado.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Reporte_Consolidado.xlsx');
   }
}
