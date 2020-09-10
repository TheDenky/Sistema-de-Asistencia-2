import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {FlashMessagesService} from 'angular2-flash-messages';

import { PersonalService } from '../../../services/personal.service';
import { Personal } from '../../../models/personal';
import {Tardanza} from '../../../models/tardanza';
import {TardanzaService} from '../../../services/tardanza.service';
import { Asistencia } from '../../../models/asistencia';
import { AsistenciaSService } from '../../../services/asistencia-s.service';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

import { report } from 'process';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [PersonalService],
})
export class RegistrarComponent implements OnInit {
  ELEMENT_DATA: Personal[];
  AsistenciaList: any = [];
  aux: any = [];
  public USER: any;
  AsistenciaLimpio: any = [];
  displayedColumns: string[] = [
    'dniPers',
    'nombPers',
    'apelPatePers',
    'apelMatePers',
    'ACTION',
    'tardanza',
    'permiso',
  ];
  
  asistencia: Asistencia = {
    idAsis: 0,
    idPers: 0,
    idInst: 0,
    estaAsis: true,
    estado: "",
    fechAsis: null,
  }
  personal: Personal = {
    idPers: 0,
    dniPers: '',
    apelPatePers: '',
    apelMatePers: '',
    nombPers: '',
    cargPers: '',
    contLaboPers: '',
    jornLaboPers: 0,
    fotoPers: null,
  };
  tardanza: Tardanza = {
    idTard: 0,
    idPers: 0,
    horaTard: 0,
    minuTard: 0,
    fechaTard: null,
  };
  dataSource = new MatTableDataSource<Personal>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private personalService: PersonalService, private asistenciaService: AsistenciaSService, private router: Router,
    public FlashMensaje: FlashMessagesService, private tardanzaService: TardanzaService,
    private toastr: ToastrService) { 
    
  }
  unapersona: any = [];

  ngOnInit(): void {
    this.obtenerDATOSUSUARIO();
    this.obtenerPersonal();
    this.obtenerDatosPersonal();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  public obtenerPersonal() {
    let resp = this.personalService.getPersonal();
    this.AsistenciaList = resp;
    resp.subscribe((report) => (this.dataSource.data = report as Personal[])); 
  }
  public obtenerDatosPersonal(){
    this.personalService.getPersonal().subscribe(
      (res) => {
        this.AsistenciaList = res as any[];
        console.log(this.AsistenciaList);
      },
      (err) => console.error(err)
    );
  }
  public LimpiarDatosPersonal(){

  }
  public guardarAsistencia(){
    console.log(this.AsistenciaList);
    for (let clave in this.AsistenciaList){
      delete this.asistencia.idAsis;
      delete this.asistencia.estado;
      this.asistencia.idPers = this.AsistenciaList[clave].idPers;
      for(let tarde in this.aux){
        if(this.asistencia.idPers == this.aux[tarde]){
          this.asistencia.estaAsis = false;
          this.aux.splice(tarde, 1);
          console.log(this.aux);
          //return
        }else{
          this.asistencia.estaAsis = true;
        }
      }
      this.SaveAsistencia();
      console.log(this.asistencia);
      if(this.aux.length == 0){
        this.asistencia.estaAsis = true;
      }  

    }
    this.showModal();
    //this.FlashMensaje.show('Asistencia almacenada correctamente !', {cssClass: 'alert-success', timeout: 6000});
    this.router.navigate(['/asistencia/list']);
  }
  public tardanzas(id){
    console.log(id);
    for(let i in this.aux)
    {
      if(this.aux[i] == id){
        this.aux.splice(i, 1);
        console.log(this.aux);
        return
      }else{
        //this.aux.push(id);
      }
    }
    this.aux.push(id)
    console.log(this.aux);
  }
  public SaveAsistencia(){
    this.asistenciaService.saveAsistencia(this.asistencia).subscribe(
      (res) => {
        console.log(res);
        //this.router.navigate(['/institucion/list']);
      },
      (err) => console.error(err)
    );
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
  public obternerTardanza(id: number, dni: string){
    
    this.personal.dniPers = dni;
    this.tardanza.idPers = id;
    this.tardanza.fechaTard = this.asistencia.fechAsis;
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    this.asistencia.idInst = this.USER.idInst;
    console.log(this.USER);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public registrarTardanza(){
    delete this.tardanza.idTard;
    console.log(this.tardanza);
    this.tardanzaService.saveTardanza(this.tardanza).subscribe(
      (res) => {
        console.log(res);
        //this.FlashMensaje.show('Tardanza Guardado correctamente !', {cssClass: 'alert-success', timeout: 5000});
        this.toastr.success('Tardanza Guardada', 'Éxitoso');
        //this.router.navigate(['/personal/list']);
      },
      (err) => {
        //this.FlashMensaje.show('Ha ocurrido algún error al Guardar !', {cssClass: 'alert-danger', timeout: 5000});
        this.toastr.error('Ha ocurrido algún error', 'Fallido');
        console.error(err)
      });
  }
  showModal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Asistencia Guardada Exitosamente !',
      showConfirmButton: false,
      timer: 4000,
    });
  }

}
