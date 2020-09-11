import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TardanzaComponent } from './tardanza.component';

describe('TardanzaComponent', () => {
  let component: TardanzaComponent;
  let fixture: ComponentFixture<TardanzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TardanzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TardanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
