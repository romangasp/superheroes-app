import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Name');
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const label = fixture.nativeElement.querySelector('mat-label');

    expect(label.textContent).toContain('Name');
  });

  it('should display the input with placeholder and type', () => {
    fixture.componentRef.setInput('placeholder', 'Spiderman');
    fixture.componentRef.setInput('type', 'text');

    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');

    expect(input.placeholder).toBe('Spiderman');
    expect(input.type).toBe('text');
  });
});
