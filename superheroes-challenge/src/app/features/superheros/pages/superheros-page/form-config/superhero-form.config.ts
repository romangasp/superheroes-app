import { Validators } from '@angular/forms';
import { formConfig } from '../../../models/config-form.model';

export const FORM_CONFIG: formConfig = {
  title: 'Crear Superhéroe',
  submitText: 'Guardar',
  cancelText: 'Cancelar',
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej. Spider-Man',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'text',
      placeholder: 'Fuerte y rápido',
    },
    {
      name: 'intelligence',
      label: 'Inteligencia',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
    {
      name: 'strength',
      label: 'Fortaleza',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
    {
      name: 'speed',
      label: 'Velocidad',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
    {
      name: 'durability',
      label: 'Resistencia',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
    {
      name: 'power',
      label: 'Potencia',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
    {
      name: 'combat',
      label: 'Lucha',
      type: 'slider',
      placeholder: '',
      defaultValue: 30,
    },
  ],
};
