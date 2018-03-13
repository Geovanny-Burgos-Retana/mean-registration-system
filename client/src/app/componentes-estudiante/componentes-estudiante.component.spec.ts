import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesEstudianteComponent } from './componentes-estudiante.component';

describe('ComponentesEstudianteComponent', () => {
  let component: ComponentesEstudianteComponent;
  let fixture: ComponentFixture<ComponentesEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentesEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
