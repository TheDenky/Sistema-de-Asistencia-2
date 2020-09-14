import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciaListComponent } from './licencia-list.component';

describe('LicenciaListComponent', () => {
  let component: LicenciaListComponent;
  let fixture: ComponentFixture<LicenciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
