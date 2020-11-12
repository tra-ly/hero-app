import { AppState } from './../../store/hero.state';
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, map, switchMap
 } from 'rxjs/operators';
import { DeleteHeroAction } from 'src/app/store/hero.actions';

import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes: Hero[];
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private store: Store<AppState>
    ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    ).subscribe(heroes => this.heroes = heroes);
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.dispatchHero(new DeleteHeroAction(hero.id));
  }

}
