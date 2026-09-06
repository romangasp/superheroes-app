import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { superheroStore } from '../store/superhero.store';

@Component({
  selector: 'app-superheros-list',
  imports: [],
  standalone: true,
  templateUrl: './superheros-list.component.html',
  styleUrl: './superheros-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperherosListComponent implements OnInit {
  public readonly superheroStore = inject(superheroStore);
  ngOnInit(): void {
    this.superheroStore.loadSuperheros();
    // const response = this.superheroService.getSuperheroes().subscribe({
    //   next: (data) => {
    //     console.log('data', data);
    //   },
    // });
    // console.log('responselist', response);
  }
}
