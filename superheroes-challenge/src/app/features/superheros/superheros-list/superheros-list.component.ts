import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { superheroStore } from '../store/superhero.store';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-superheros-list',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './superheros-list.component.html',
  styleUrl: './superheros-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosListComponent implements OnInit {
  public readonly superheroStore = inject(superheroStore);
  ngOnInit(): void {
    this.superheroStore.loadSuperheros();
  }

  deleteSuperhero(id: string): void {
    this.superheroStore.deleteSuperhero(id);
  }
}
