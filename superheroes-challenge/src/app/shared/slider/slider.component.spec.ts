import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Inteligencia');
    fixture.componentRef.setInput('value', 80);
    fixture.componentRef.setInput('control', new FormControl(80));
    fixture.componentRef.setInput('name', 'intelligence');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const label = fixture.nativeElement.querySelector('.slider-label');

    expect(label.textContent).toContain('Inteligencia');
  });

  it('should display the value', () => {
    const value = fixture.nativeElement.querySelector('.slider-value');

    expect(value.textContent).toContain('80');
  });
});
