import { HeroService } from './../hero.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { AddHeroAction, HeroActionTypes, LoadHeroAction, LoadHeroSuccessAction, LoadHeroFailureAction, AddHeroSuccessAction, AddHeroFailureAction, DeleteHeroAction, DeleteHeroSuccessAction, DeleteHeroFailureAction, UpdateHeroAction, UpdateHeroSuccessAction, UpdateHeroFailureAction } from './hero.actions';

@Injectable()
export class HeroEffects {
  @Effect() loadHero$ = this.actions$
    .pipe(
      ofType<LoadHeroAction>(HeroActionTypes.LOAD_HERO),
      mergeMap(
        (data) => this.HeroService.getHeroes(data.payload)
          .pipe(
            map(data => {
              return new LoadHeroSuccessAction(data)
            }),
            catchError(error => of(new LoadHeroFailureAction(error)))
          )
      ),
    )

  @Effect() addHero$ = this.actions$
    .pipe(
      ofType<AddHeroAction>(HeroActionTypes.ADD_HERO),
      mergeMap(
        (data) => this.HeroService.insertHero(data.payload)
          .pipe(
            map(data => {
              return new AddHeroSuccessAction(data)
            }),
            catchError(error => of(new AddHeroFailureAction(error)))
          )
      )
    );

  @Effect() deleteHero$ = this.actions$
    .pipe(
      ofType<DeleteHeroAction>(HeroActionTypes.DELETE_HERO),
      mergeMap(
        (data) => this.HeroService.deleteHero(data.payload)
          .pipe(
            map(() => new DeleteHeroSuccessAction(data.payload)),
            catchError(error => of(new DeleteHeroFailureAction(error)))
          )
      )
    );

  @Effect() updateHero$ = this.actions$
    .pipe(
      ofType<UpdateHeroAction>(HeroActionTypes.UPDATE_HERO),
      mergeMap(
        (data) => this.HeroService.updateHero(data.payload)
          .pipe(
            map(() => new UpdateHeroSuccessAction(data.payload)),
            catchError(error => of(new UpdateHeroFailureAction(error)))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private HeroService: HeroService
  ) { }
}