import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superhero } from '../models/superhero.model';

export interface DeleteSuperheroResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private readonly http = inject(HttpClient);

  API_ULR = 'http://127.0.0.1:5001/superheroes-app-991f0/us-central1/api/superheroes';

  getSuperheroes(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.API_ULR);
  }
  getSupeheroById(id: string): Observable<Superhero> {
    return this.http.get<Superhero>(`${this.API_ULR}/${id}`);
  }
  /*eslint-disable*/ //@ts-ignore
  createSuperhero(superhero: Superhero): Observable<Superhero> {
    console.log(superhero, 'superhero service');
    return this.http.post<Superhero>(`${this.API_ULR}`, superhero, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteSuperhero(id: string): Observable<DeleteSuperheroResponse> {
    return this.http.delete<DeleteSuperheroResponse>(`${this.API_ULR}/${id}`);
  }
}
