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
import { Superhero } from '../../models/superhero.model';
import { EmptyMessageComponent } from '../../../../shared/empty-message/empty-message.component';
import { InputComponent } from '../../../../shared/input/input.component';
import { FormControl } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert-service/alert.service';

@Component({
  selector: 'app-superheros-page',
  imports: [
    SuperherosListComponent,
    SpinnerComponent,
    MatButtonModule,
    MatIconModule,
    FormComponent,
    EmptyMessageComponent,
    InputComponent,
  ],
  templateUrl: './superheros-page.component.html',
  styleUrl: './superheros-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosPageComponent implements OnInit {
  public readonly superheroStore = inject(superheroStore);
  private readonly dialog = inject(MatDialog);
  private readonly alertService = inject(AlertService);
  readonly formConfig = FORM_CONFIG;
  isAddHero = signal<boolean>(false);
  isEditHero = signal<boolean>(false);
  heroId = signal<string>('');
  /*eslint-disable*/ //@ts-ignore
  superheroData = signal<Superhero>();
  readonly searchControl = new FormControl('');

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
        this.superheroStore.deleteSuperhero(id).subscribe({
          next: () => {
            this.alertService.success('Superhéroe creado correctamente', 'Cerrar');
          },
          error: (error) => {
            this.alertService.error('No se pudo eliminar el superhéroe', 'Cerrar');
            console.error(error);
          },
        });
      }
    });
  }

  openEditForm(id: string): void {
    this.heroId.set(id);
    this.superheroStore.getSuperhero(id).subscribe({
      next: (data) => {
        this.superheroData.set(data);
        this.isEditHero.set(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addHero(): void {
    this.isAddHero.set(!this.isAddHero());
  }
  /*eslint-disable*/ //@ts-ignore
  handleFormSubmit(formData: any) {
    console.log('Datos:', formData);
    this.superheroStore.createSuperhero(formData).subscribe({
      next: () => {
        this.alertService.success('Superhéroe creado correctamente', 'Cerrar');
        this.formComponent.resetForm();
      },
      error: () => {
        this.alertService.error('No se pudo crear el superhéroe', 'Cerrar');
      },
    });
  }

  updateSearchInput(event: string) {
    this.superheroStore.searchInput.set(event);
  }

  handleFormCancel() {
    this.isAddHero.set(false);
    this.isEditHero.set(false);
  }
}
