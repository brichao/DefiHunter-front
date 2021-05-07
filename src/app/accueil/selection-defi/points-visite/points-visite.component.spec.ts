import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsVisiteComponent } from './points-visite.component';

describe('PointsVisiteComponent', () => {
  let component: PointsVisiteComponent;
  let fixture: ComponentFixture<PointsVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
