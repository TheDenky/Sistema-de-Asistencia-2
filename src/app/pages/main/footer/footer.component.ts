import { Component, OnInit } from '@angular/core';
import { version } from './../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public appVersion = version;
  public USER: any;
  constructor() {}

  ngOnInit() {
    this.obtenerDATOSUSUARIO();
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
}
