import { computed, inject, Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superhero.model';
import { DeleteSuperheroResponse, SuperheroService } from '../services/superhero.service';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class superheroStore {
  private readonly superheroService = inject(SuperheroService);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly superheros = signal<Superhero[]>([]);
  readonly successMessage = signal<string | null>(null);
  searchInput = signal<string>('');

  readonly filteredSuperheros = computed(() => {
    const input = this.searchInput().toLowerCase().trim();
    if (!input) return this.superheros();

    return this.superheros().filter((hero) => hero.name.toLowerCase().includes(input));
  });

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

  getSuperhero(id: string): Observable<Superhero> {
    this.loading.set(true);
    this.error.set(null);
    return this.superheroService.getSupeheroById(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.error.set(error.error.message ?? 'No se pudo crear el superhéroe');

        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  createSuperhero(superhero: Superhero): Observable<Superhero> {
    this.loading.set(true);
    this.error.set(null);

    return this.superheroService.createSuperhero(superhero).pipe(
      tap((response) => {
        this.superheros.update((superheros) => [...superheros, response]);
      }),
      catchError((error: HttpErrorResponse) => {
        this.error.set(error.error.message ?? 'No se pudo crear el superhéroe');

        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  deleteSuperhero(id: string): Observable<DeleteSuperheroResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.superheroService.deleteSuperhero(id).pipe(
      tap(() => {
        this.superheros.update((superheros) =>
          superheros.filter((superhero) => superhero.id !== id),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.error.set(error.error.message ?? 'No se pudo eliminar el superheroe');
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false)),
    );
  }
}
