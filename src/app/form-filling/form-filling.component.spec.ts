import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFillingComponent } from './form-filling.component';

describe('FormFillingComponent', () => {
  let component: FormFillingComponent;
  let fixture: ComponentFixture<FormFillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFillingComponent]
    });
    fixture = TestBed.createComponent(FormFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
