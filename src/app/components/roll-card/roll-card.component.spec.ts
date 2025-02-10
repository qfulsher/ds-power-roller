import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollCardComponent } from './roll-card.component';

describe('RollCardComponent', () => {
  let component: RollCardComponent;
  let fixture: ComponentFixture<RollCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
