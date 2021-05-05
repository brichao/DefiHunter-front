import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChamisComponent } from './modifier-chamis.component';

describe('ModifierChamisComponent', () => {
  let component: ModifierChamisComponent;
  let fixture: ComponentFixture<ModifierChamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierChamisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierChamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
