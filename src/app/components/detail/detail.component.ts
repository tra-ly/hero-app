import { HeroService } from './../../hero.service';
import { Observable, Subject } from 'rxjs';
import { UpdateHeroAction } from './../../store/hero.actions';
import { AppState } from './../../store/hero.state';
import { Store } from '@ngrx/store';
import { Hero } from './../../hero';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() hero: Hero;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  constructor(
    private store: Store<AppState>,
    private heroService: HeroService
    ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.store.dispatch(new UpdateHeroAction(this.hero));
    this.heroService.selectHero(this.loading$, this.error$, this.store);
  }
}
