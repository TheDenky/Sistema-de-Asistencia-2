import { Component, OnInit } from '@angular/core';
import { InstitucionService } from '../../../services/institucion.service';
import { Institucion } from 'src/app/models/institucion';
import { CitiesService } from '../../../services/cities.service';
import { Region, Distrito, Provincia } from 'src/app/models/cities.model';
import { ActivatedRoute, Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-inst-form',
  templateUrl: './inst-form.component.html',
  styleUrls: ['./inst-form.component.scss'],
  providers: [CitiesService],
})
export class InstFormComponent implements OnInit {
  public selectedRegion: Region = { id: '', name: '' };
  public selectedProvincia: Provincia = { id: '', regionId: '', name: '' };
  public regiones: Region[];
  public provincias: Provincia[];
  public distritos: Distrito[];

  institucion: Institucion = {
    idInst: 0,
    idDist: '',
    codiModuInst: 0,
    nombInst: '',
    numeInst: 0,
    niveEduInst: '',
    modaInst: '',
    turnInst: '',
    direInst: '',
  };
  edit: boolean = false;

  constructor(
    private institucionService: InstitucionService,
    private citiesServices: CitiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public FlashMensaje: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.citiesServices.getRegiones();
    const params = this.activatedRoute.snapshot.params;
    //console.log(params);
    if (params.id) {
      this.institucionService.instget(params.id).subscribe(
        (res) => {
          console.log(res);
          this.institucion = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
    //console.log(this.citiesServices.getRegiones());
    //console.log(this.citiesServices.getProvincias());
    //console.log(this.citiesServices.getDistritos());
  }
  onSelectRegion(id: any): void {
    console.log('id->', id);
    this.onSelectProvincia('');
    this.institucion.idDist = '';
    this.provincias = this.citiesServices
      .getProvincias()
      .filter((item) => item.regionId == id);
    this.selectedProvincia = { id: '', regionId: '', name: '' };

    //this.distritos = this.citiesServices.getDistritos().filter(item => item.provinciaId == id);
    //this.institucion.idDist == id;
  }
  onSelectProvincia(id: any): void {
    console.log('id->', id);
    this.distritos = this.citiesServices
      .getDistritos()
      .filter((item) => item.provinciaId == id);
    this.institucion.idDist = '';
    //this.selectedProvincia = {id: '', regionId: '', name: ''};
    //this.institucion.idDist == id;
  }

  SaveNewInstitucion() {
    delete this.institucion.idInst;
    console.log(this.institucion);

    this.institucionService.saveInstitucion(this.institucion).subscribe(
      (res) => {
        console.log(res);
        this.FlashMensaje.show('Institución Guardado correctamente !', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/institucion/list']);
      },
      (err) => {
        this.FlashMensaje.show('Ha ocurrido algún error al Guardar !', {cssClass: 'alert-danger', timeout: 5000});
        console.error(err)
      } 
    );
  }
  updateInstitucion() {
    //console.log(this.institucion)
    this.institucionService
      .updateInstitucion(this.institucion.idInst, this.institucion)
      .subscribe(
        (res) => {
          console.log(res);
          this.FlashMensaje.show('Institución Modificado correctamente !', {cssClass: 'alert-primary', timeout: 5000});
          this.router.navigate(['/institucion/list']);
        },
        (err) => {
          this.FlashMensaje.show('Ha ocurrido algún error al Modificar !', {cssClass: 'alert-danger', timeout: 5000});
          console.error(err)
        } 
      );
  }
}
