import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionDefiComponent } from './selection-defi.component';

describe('SelectionDefiComponent', () => {
  let component: SelectionDefiComponent;
  let fixture: ComponentFixture<SelectionDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
