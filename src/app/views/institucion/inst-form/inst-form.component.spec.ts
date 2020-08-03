import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstFormComponent } from './inst-form.component';

describe('InstFormComponent', () => {
  let component: InstFormComponent;
  let fixture: ComponentFixture<InstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
