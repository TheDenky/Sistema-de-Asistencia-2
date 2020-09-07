import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import {Usuario} from '../../../models/usuario';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  public USER: any;

  isLogged: Boolean = false;

  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService: AppService) {
    this.obtenerDATOSUSUARIO();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
  obtenerDATOSUSUARIO (){
    this.USER = JSON.parse( localStorage.getItem("DATOSUSUARIO"));
    console.log(this.USER);
  }
}
