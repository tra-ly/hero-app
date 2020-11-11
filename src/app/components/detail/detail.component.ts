import { Location } from '@angular/common';
import { HeroService } from './../../hero.service';
import { Observable } from 'rxjs';
import { UpdateHeroAction } from './../../store/hero.actions';
import { AppState } from './../../store/hero.state';
import { Store } from '@ngrx/store';
import { Hero } from './../../hero';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() callbackGoBack: (args: any) => void;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  constructor(
    private store: Store<AppState>,
    private heroService: HeroService,
    private route: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.store.dispatch(new UpdateHeroAction(this.hero));
    this.error$ = this.heroService.selectError();
    this.loading$ = this.heroService.selectLoading();
    if(this.route.url!=='/heroes') {
      this.location.back();
    }
  }
}
