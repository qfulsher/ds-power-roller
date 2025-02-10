import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuraIconComponent } from './aura-icon.component';

describe('AuraIconComponent', () => {
  let component: AuraIconComponent;
  let fixture: ComponentFixture<AuraIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuraIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuraIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
