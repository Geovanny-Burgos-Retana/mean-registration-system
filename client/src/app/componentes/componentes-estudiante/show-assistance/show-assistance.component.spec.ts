import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssistanceComponent } from './show-assistance.component';

describe('ShowAssistanceComponent', () => {
  let component: ShowAssistanceComponent;
  let fixture: ComponentFixture<ShowAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
