import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexFormsComponent } from './complex-forms.component';

describe('ComplexFormsComponent', () => {
  let component: ComplexFormsComponent;
  let fixture: ComponentFixture<ComplexFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
