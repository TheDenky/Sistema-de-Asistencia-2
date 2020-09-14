import { Injectable } from '@angular/core';
import { Region, Provincia, Distrito } from '../models/cities.model';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private regiones: Region[] = [
    {
      id: 'R0000',
      name: 'Selecciona...',
    },
    {
      id: 'R0001',
      name: 'Apurimac',
    },
    {
      id: 'R0002',
      name: 'Ayacucho',
    },
    {
      id: 'R0003',
      name: 'Cusco',
    },
  ];
  private provincias: Provincia[] = [
    {
      id: 'P0000',
      regionId: 'R0001',
      name: 'Selecciona...',
    },
    {
      id: 'P0001',
      regionId: 'R0001',
      name: 'Andahuaylas',
    },
    {
      id: 'P0002',
      regionId: 'R0001',
      name: 'Chincheros',
    },
    {
      id: 'P0003',
      regionId: 'R0002',
      name: 'Ayacucho',
    },
    {
      id: 'P0004',
      regionId: 'R0003',
      name: 'Cusco',
    },
  ];
  private distritos: Distrito[] = [
    {
      id: 'D0001',
      regionId: 'R0001',
      provinciaId: 'P0001',
      name: 'Andahuaylas',
    },
    {
      id: 'D0002',
      regionId: 'R0001',
      provinciaId: 'P0001',
      name: 'San Jeronimo',
    },
    {
      id: 'D0003',
      regionId: 'R0001',
      provinciaId: 'P0001',
      name: 'Talavera',
    },
    {
      id: 'D0006',
      regionId: 'R0001',
      provinciaId: 'P0002',
      name: 'Abancay',
    },
    {
      id: 'D0004',
      regionId: 'R0002',
      provinciaId: 'P0003',
      name: 'Ayacucho',
    },
    {
      id: 'D0005',
      regionId: 'R0003',
      provinciaId: 'P0004',
      name: 'Cusco',
    },
  ];

  getRegiones(): Region[] {
    return this.regiones;
  }
  getProvincias(): Provincia[] {
    return this.provincias;
  }
  getDistritos(): Distrito[] {
    return this.distritos;
  }
}
