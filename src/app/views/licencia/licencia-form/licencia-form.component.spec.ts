import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciaFormComponent } from './licencia-form.component';

describe('LicenciaFormComponent', () => {
  let component: LicenciaFormComponent;
  let fixture: ComponentFixture<LicenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
