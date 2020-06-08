import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaForoComponent } from './lista-foro.component';

describe('ListaForoComponent', () => {
  let component: ListaForoComponent;
  let fixture: ComponentFixture<ListaForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
