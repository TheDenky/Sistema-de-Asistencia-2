import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTardanzasComponent } from './mis-tardanzas.component';

describe('MisTardanzasComponent', () => {
  let component: MisTardanzasComponent;
  let fixture: ComponentFixture<MisTardanzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTardanzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTardanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
