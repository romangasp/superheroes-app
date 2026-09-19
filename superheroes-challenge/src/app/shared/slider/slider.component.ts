import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  imports: [MatSliderModule, ReactiveFormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  value = input.required<number>();
  label = input.required<string>();
  control = input.required<FormControl>();
  name = input.required<string>();
  thumbLabel = signal(false);
}
