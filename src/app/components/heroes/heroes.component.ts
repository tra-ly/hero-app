import { HeroService } from 'src/app/hero.service';
import { DeleteHeroAction, LoadHeroAction } from './../../store/hero.actions';
import { Observable } from 'rxjs';
import { AppState } from './../../store/hero.state';
import { Hero } from './../../hero';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  selectedHero: Hero;
  p: number = 1;
  limit: number = 10;
  total: number = 499;
  constructor(
    private store: Store<AppState>,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHeroes(this.p);
  }

  getHeroes(p: number) {
    let offset = (p - 1) * this.limit;
    let limit = this.limit;
    this.heroes = this.heroService.selectHeroes();
    this.error$ = this.heroService.selectError();
    this.loading$ = this.heroService.selectLoading();
    this.heroService.dispatchHero(new LoadHeroAction({ offset, limit }));
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getHeroes(this.p);
  }

  deleteHero(id: number) {
    this.store.dispatch(new DeleteHeroAction(id));
  }

  onSelect(hero: Hero) {
    this.selectedHero = { ...hero };
  }
}
