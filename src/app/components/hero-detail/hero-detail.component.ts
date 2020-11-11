import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter(param => !!param.get('id')),
      map(param => param.get('id')),
      switchMap(id => this.heroService.selectHero(+id))
    ).subscribe(hero => {
      this.hero = hero;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
