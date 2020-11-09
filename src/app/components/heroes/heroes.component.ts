import { HeroService } from './../../hero.service';
import { Hero } from './../../hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  p: number = 1;
  limit: number = 10;
  total: number = 499;
  constructor(
    private heroService: HeroService
    ) { }

  ngOnInit() {
    this.getHeroes(this.p);
  }

  getHeroes(p: number): void {
    let offset = (p - 1) * this.limit;
    this.heroService.getHeroes(offset, this.limit)
    .subscribe(heroes => this.heroes = heroes);
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getHeroes(this.p);
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
