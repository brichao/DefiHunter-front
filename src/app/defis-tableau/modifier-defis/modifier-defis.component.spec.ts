import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDefisComponent } from './modifier-defis.component';

describe('ModifierDefisComponent', () => {
  let component: ModifierDefisComponent;
  let fixture: ComponentFixture<ModifierDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
