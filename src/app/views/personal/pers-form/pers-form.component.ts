import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../../services/personal.service';
import { Personal } from 'src/app/models/personal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pers-form',
  templateUrl: './pers-form.component.html',
  styleUrls: ['./pers-form.component.scss'],
})
export class PersFormComponent implements OnInit {
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
  edit: boolean = false;

  constructor(
    private personalService: PersonalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.personalService.getOnePersonal(params.id).subscribe(
        (res) => {
          console.log(res);
          this.personal = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }

  saveNewPersonal() {
    delete this.personal.idPers;
    delete this.personal.fotoPers;
    console.log(this.personal);

    this.personalService.savePersonal(this.personal).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/personal/list']);
      },
      (err) => console.error(err)
    );
  }
  updatePersonal() {
    //console.log(this.institucion)
    this.personalService
      .updatePersonal(this.personal.idPers, this.personal)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/personal/list']);
        },
        (err) => console.error(err)
      );
  }
}
