import { HeroService } from 'src/app/hero.service';
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
  heroes$: Observable<Hero[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  hero: Hero

  constructor(
    private store: Store<AppState>,
    private heroService: HeroService
    ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.heroService.selectHeroes();
    this.loading$ = this.heroService.selectLoading();
    this.error$ = this.heroService.selectError();
    this.store.dispatch(new LoadHeroAction({offset: 0, limit: 4}));
  }
}
