import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamisTableauComponent } from './chamis-tableau.component';

describe('ChamisTableauComponent', () => {
  let component: ChamisTableauComponent;
  let fixture: ComponentFixture<ChamisTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamisTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamisTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
