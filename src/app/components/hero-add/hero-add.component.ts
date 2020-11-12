import { HeroService } from 'src/app/hero.service';
import { AddHeroAction } from './../../store/hero.actions';
import { AppState } from './../../store/hero.state';
import { Hero } from './../../hero';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
  }

  addHero(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.dispatchHero(new AddHeroAction({name} as Hero));
  }
}
