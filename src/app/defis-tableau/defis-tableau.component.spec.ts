import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisTableauComponent } from './defis-tableau.component';

describe('DefisTableauComponent', () => {
  let component: DefisTableauComponent;
  let fixture: ComponentFixture<DefisTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefisTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefisTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
