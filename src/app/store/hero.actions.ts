import { Action } from '@ngrx/store';
import { Hero } from '../hero';

export enum HeroActionTypes {
    LOAD_HERO = '[HERO] Load Hero',
    LOAD_HERO_SUCCESS = '[HERO] Load Hero Success',
    LOAD_HERO_FAILURE = '[HERO] Load Hero Failure',
    ADD_HERO = '[HERO] Add Hero',
    ADD_HERO_SUCCESS = '[HERO] Add Hero Success',
    ADD_HERO_FAILURE = '[HERO] Add Hero Failure',
    DELETE_HERO = '[HERO] Delete Hero',
    DELETE_HERO_SUCCESS = '[HERO] Delete Hero Success',
    DELETE_HERO_FAILURE = '[HERO] Delete Hero Failure',
    UPDATE_HERO = '[HERO] Update Hero',
    UPDATE_HERO_SUCCESS = '[HERO] Update Hero Success',
    UPDATE_HERO_FAILURE = '[HERO] Update Hero Failure',
}

export class LoadHeroAction implements Action {
    readonly type = HeroActionTypes.LOAD_HERO
    constructor(public payload: {offset: number, limit: number}) { }
}

export class LoadHeroSuccessAction implements Action {
    readonly type = HeroActionTypes.LOAD_HERO_SUCCESS

    constructor(public payload: Hero[]) {}
}

export class LoadHeroFailureAction implements Action {
    readonly type = HeroActionTypes.LOAD_HERO_FAILURE

    constructor(public payload: Error) {}
}

export class AddHeroAction implements Action {
    readonly type = HeroActionTypes.ADD_HERO

    constructor(public payload: Hero) { }
}
export class AddHeroSuccessAction implements Action {
    readonly type = HeroActionTypes.ADD_HERO_SUCCESS

    constructor(public payload: Hero) { }
}
export class AddHeroFailureAction implements Action {
    readonly type = HeroActionTypes.ADD_HERO_FAILURE

    constructor(public payload: Error) { }
}

export class DeleteHeroAction implements Action {
    readonly type = HeroActionTypes.DELETE_HERO

    constructor(public payload: number) { }
}

export class DeleteHeroSuccessAction implements Action {
    readonly type = HeroActionTypes.DELETE_HERO_SUCCESS

    constructor(public payload: number) { }
}
export class DeleteHeroFailureAction implements Action {
    readonly type = HeroActionTypes.DELETE_HERO_FAILURE

    constructor(public payload: number) { }
}

export class UpdateHeroAction implements Action {
    readonly type = HeroActionTypes.UPDATE_HERO

    constructor(public payload: Hero) { }
}

export class UpdateHeroSuccessAction implements Action {
    readonly type = HeroActionTypes.UPDATE_HERO_SUCCESS

    constructor(public payload: Hero) { }
}

export class UpdateHeroFailureAction implements Action {
    readonly type = HeroActionTypes.UPDATE_HERO_FAILURE

    constructor(public payload: Hero) { }
}

export type HeroAction = AddHeroAction |
AddHeroSuccessAction |
AddHeroFailureAction |
DeleteHeroAction |
DeleteHeroSuccessAction |
DeleteHeroFailureAction |
LoadHeroAction |
LoadHeroFailureAction |
LoadHeroSuccessAction |
UpdateHeroAction |
UpdateHeroFailureAction |
UpdateHeroSuccessAction