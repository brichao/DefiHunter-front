import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisPageComponent } from './defis-page.component';

describe('DefisPageComponent', () => {
  let component: DefisPageComponent;
  let fixture: ComponentFixture<DefisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefisPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
