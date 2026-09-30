import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldConfig, formConfig } from '../../features/superheros/models/config-form.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { SliderComponent } from '../slider/slider.component';
import { Superhero } from '../../features/superheros/models/superhero.model';

//type FormControlType = { value: string; validators: ValidatorFn[] };
@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    InputComponent,
    SliderComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  config = input.required<formConfig>();

  formSubmit = output<typeof this.form.value>();
  formCancel = output();
  /*eslint-disable*/ //@ts-ignore
  data = input<Superhero>({});

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  /*eslint-disable*/ //@ts-ignore
  form!: FormGroup<{ [key: string]: FormControl }>;

  ngOnInit(): void {
    this.form = this.initForm();
    console.log('data form', this.data());
    if (!!this.data) {
      this.form.patchValue(this.data());
    }
  }

  initForm(): FormGroup {
    /*eslint-disable*/ //@ts-ignore
    const controls: { [key: string]: FormControl } = {};
    this.config().fields.forEach((field: FieldConfig) => {
      controls[field.name] = new FormControl(field.defaultValue ?? '', field.validators ?? []);
    });
    return this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('form', this.form.value);
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  resetForm(): void {
    const defaultValues: { [key: string]: string | number } = {};
    this.config().fields.forEach((field: FieldConfig) => {
      defaultValues[field.name] = field.defaultValue ?? '';
    });

    // Resets value, and clears dirty/touched/submitted state (removes the red/invalid styling)
    if (this.formGroupDirective) {
      this.formGroupDirective.resetForm(defaultValues);
    } else {
      this.form.reset(defaultValues);
    }
  }

  getFormControl(fieldName: string): FormControl {
    return this.form.get(fieldName) as FormControl;
  }
}
