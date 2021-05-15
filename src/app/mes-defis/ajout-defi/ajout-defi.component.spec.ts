import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDefiComponent } from './ajout-defi.component';

describe('AjoutDefiComponent', () => {
  let component: AjoutDefiComponent;
  let fixture: ComponentFixture<AjoutDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
