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
  heroes: Hero[];
  loading$: Observable<Boolean>;
  error$: Observable<Error>

  constructor(
    private heroService: HeroService
    ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.selectHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
    this.loading$ = this.heroService.selectLoading();
    this.error$ = this.heroService.selectError();
    this.heroService.dispatchHero(new LoadHeroAction(0));
  }
}
