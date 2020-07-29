import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersFormComponent } from './pers-form.component';

describe('PersFormComponent', () => {
  let component: PersFormComponent;
  let fixture: ComponentFixture<PersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
