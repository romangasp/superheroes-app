import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Superhero } from '../models/superhero.model';
@Component({
  selector: 'app-superheros-list',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './superheros-list.component.html',
  styleUrl: './superheros-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosListComponent {
  superherosList = input.required<Superhero[]>();
  deleteAction = output<string>();

  onDeleteSuperhero(id: string) {
    this.deleteAction.emit(id);
  }
}
