import { GetHeroAction, LoadHeroAction } from './store/hero.actions';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';
import { AppState } from './store/hero.state';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
  dispatchHero (action: Action) {
    this.store.dispatch(action);
  }

  selectHero(id: number): Observable<Hero> {
    this.store.dispatch(new GetHeroAction(id))
    return this.store.select(store => store.hero.list.find(h => h.id === id));
  }

  selectHeroes() {
    return this.store.select(store => store.hero.list);
  }

  selectError() {
    return this.store.select(store => store.hero.error);
  }

  selectLoading() {
    return this.store.select(store => store.hero.loading);
  }

  getHeroes(pagination: {offset: number, limit: number}): Observable<Hero[]> {
    return this.http.get<Hero[]>(`http://localhost:8000/api/heroes/${pagination.offset}/${pagination.limit}`).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`http://localhost:8000/api/heroes/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  insertHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('http://localhost:8000/api/heroes/add', hero).pipe(
      tap((newHero: Hero) => this.log(`added hero id=${newHero}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/heroes/' + hero.id, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number) {
    return this.http.delete(`http://localhost:8000/api/heroes/${id}`).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`http://localhost:8000/api/heroes/search/?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
