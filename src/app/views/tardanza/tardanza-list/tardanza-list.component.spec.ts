import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TardanzaListComponent } from './tardanza-list.component';

describe('TardanzaListComponent', () => {
  let component: TardanzaListComponent;
  let fixture: ComponentFixture<TardanzaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TardanzaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TardanzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
