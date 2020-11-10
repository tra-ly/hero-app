import { LoadHeroAction } from './../../store/hero.actions';
import { Observable } from 'rxjs';
import { AppState } from './../../store/hero.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../../hero';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  hero: Hero

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.store.select(store => store.hero.list);
    this.loading$ = this.store.select(store => store.hero.loading);
    this.error$ = this.store.select(store => store.hero.error);

    this.store.dispatch(new LoadHeroAction({offset: 0, limit: 4}));
  }
}
