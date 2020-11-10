import { Observable } from 'rxjs';
import { UpdateHeroAction } from './../../store/hero.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { AppState } from 'src/app/store/hero.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  
  save(): void {
    this.store.dispatch(new UpdateHeroAction(this.hero));
    this.heroService.selectHero(this.loading$, this.error$, this.store);
    this.goBack()
  }

  goBack(): void {
    this.location.back();
  }
}
