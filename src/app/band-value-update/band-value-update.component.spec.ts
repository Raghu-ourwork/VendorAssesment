import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadValueUpdateComponent } from './band-value-update.component';

describe('BadValueUpdateComponent', () => {
  let component: BadValueUpdateComponent;
  let fixture: ComponentFixture<BadValueUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadValueUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadValueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
