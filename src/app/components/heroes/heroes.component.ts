import { HeroService } from 'src/app/hero.service';
import { DeleteHeroAction, LoadHeroAction } from './../../store/hero.actions';
import { Observable } from 'rxjs';
import { AppState } from './../../store/hero.state';
import { Hero } from './../../hero';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  hero: Hero = { _id: '', id: 0, name: '' }
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
    this.heroes = this.store.select(store => store.hero.list);
    this.heroService.selectHero(this.loading$, this.error$, this.store);
    this.store.dispatch(new LoadHeroAction({offset, limit}));
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getHeroes(this.p);
  }

  deleteHero(id: number): void {
    this.store.dispatch(new DeleteHeroAction(id));
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
