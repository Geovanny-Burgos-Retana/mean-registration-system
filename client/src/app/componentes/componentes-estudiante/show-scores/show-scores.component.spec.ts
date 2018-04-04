import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowScoresComponent } from './show-scores.component';

describe('ShowScoresComponent', () => {
  let component: ShowScoresComponent;
  let fixture: ComponentFixture<ShowScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
