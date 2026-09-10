import { inject, Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { SuperheroService } from '../services/superhero.service';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class superheroStore {
  private readonly superheroService = inject(SuperheroService);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly superheros = signal<Superhero[]>([]);
  readonly successMessage = signal<string | null>(null);

  loadSuperheros(): void {
    this.loading.set(true);
    this.superheroService.getSuperheroes().subscribe({
      next: (superheros: Superhero[]) => {
        this.superheros.set(superheros);
        this.loading.set(false);
        console.log('data', superheros);
      },
      error: (error: string | null) => {
        this.error.set(error);
        this.loading.set(false);
      },
    });
  }

  deleteSuperhero(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.superheroService
      .deleteSuperhero(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.superheros.update((superheros) =>
            superheros.filter((superhero) => superhero.id !== id),
          );

          this.successMessage.set(response.message);
        },
        error: (error: string | null) => {
          console.error(error);
          this.error.set('Unable to delete superhero');
        },
      });
  }
}
