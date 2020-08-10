export interface Region {
  id: string;
  name: string;
}
export interface Provincia {
  id: string;
  regionId: string;
  name: string;
}
export interface Distrito {
  id: string;
  regionId: string;
  provinciaId: string;
  name: string;
}
