import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajarComponent } from './viajar.component';

describe('ViajarComponent', () => {
  let component: ViajarComponent;
  let fixture: ComponentFixture<ViajarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
