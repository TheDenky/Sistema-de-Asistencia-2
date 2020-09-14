import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesListComponent } from './vacaciones-list.component';

describe('VacacionesListComponent', () => {
  let component: VacacionesListComponent;
  let fixture: ComponentFixture<VacacionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacacionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
