import { inject, Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { SuperheroService } from '../services/superhero.service';

@Injectable({ providedIn: 'root' })
export class superheroStore {
  private readonly superheroService = inject(SuperheroService);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly superheros = signal<Superhero[]>([]);

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
}
