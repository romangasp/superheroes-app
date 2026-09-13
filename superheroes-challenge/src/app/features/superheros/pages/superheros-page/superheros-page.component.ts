import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { SuperherosListComponent } from '../../superheros-list/superheros-list.component';
import { superheroStore } from '../../store/superhero.store';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-superheros-page',
  imports: [SuperherosListComponent],
  templateUrl: './superheros-page.component.html',
  styleUrl: './superheros-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosPageComponent implements OnInit {
  public readonly superheroStore = inject(superheroStore);
  private readonly dialog = inject(MatDialog);

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
}
