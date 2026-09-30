import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { SuperherosListComponent } from '../../superheros-list/superheros-list.component';
import { superheroStore } from '../../store/superhero.store';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FORM_CONFIG } from './form-config/superhero-form.config';
import { FormComponent } from '../../../../shared/form/form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Superhero } from '../../models/superhero.model';
//import { Superhero } from '../../models/superhero.model';
@Component({
  selector: 'app-superheros-page',
  imports: [
    SuperherosListComponent,
    SpinnerComponent,
    MatButtonModule,
    MatIconModule,
    FormComponent,
  ],
  templateUrl: './superheros-page.component.html',
  styleUrl: './superheros-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosPageComponent implements OnInit {
  public readonly superheroStore = inject(superheroStore);
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  readonly formConfig = FORM_CONFIG;
  isAddHero = signal<boolean>(false);
  isEditHero = signal<boolean>(false);
  heroId = signal<string>('');
  /*eslint-disable*/ //@ts-ignore
  superheroData = signal<Superhero>();

  @ViewChild(FormComponent) formComponent!: FormComponent;

  ngOnInit(): void {
    this.superheroStore.loadSuperheros();
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar superheroe',
        confirmText: 'Eliminar',
        cancelText: 'Aceptar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.superheroStore.deleteSuperhero(id);
      }
    });
  }

  openEditForm(id: string): void {
    this.heroId.set(id);
    this.superheroStore.getSuperhero(id).subscribe({
      next: (data) => {
        console.log('dataPage', data);
        this.superheroData.set(data);
        this.isEditHero.set(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addHero(): void {
    console.log(this.isAddHero());
    this.isAddHero.set(!this.isAddHero());
  }
  /*eslint-disable*/ //@ts-ignore
  handleFormSubmit(formData: any) {
    console.log('Datos:', formData);
    this.superheroStore.createSuperhero(formData).subscribe({
      next: () => {
        this.snackbar.open('Superhéroe creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.formComponent.resetForm();
      },
      error: () => {
        this.snackbar.open('No se pudo crear el superhéroe', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  handleFormCancel() {
    console.log('Cancelado');
    this.isAddHero.set(false);
    this.isEditHero.set(false);
  }
}
