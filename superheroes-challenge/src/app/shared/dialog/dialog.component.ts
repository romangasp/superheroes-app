import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface GenericDialogData {
  title: string;
  confirmText: string;
  cancelText: string;
  showConfirmButton: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public data = inject<GenericDialogData>(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<DialogComponent>);
  title = input<string>(this.data.title ?? '');
  confirmText = input<string>(this.data.confirmText ?? 'Aceptar');
  cancelText = input<string>(this.data.cancelText ?? 'Cancelar');
  showConfirmButton = input<boolean>(this.data.showConfirmButton ?? true);

  confirm = output<void>();
  cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.cancel.emit();
    this.dialogRef.close(false);
  }
}
