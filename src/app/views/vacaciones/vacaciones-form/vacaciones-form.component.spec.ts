import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesFormComponent } from './vacaciones-form.component';

describe('VacacionesFormComponent', () => {
  let component: VacacionesFormComponent;
  let fixture: ComponentFixture<VacacionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacacionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
