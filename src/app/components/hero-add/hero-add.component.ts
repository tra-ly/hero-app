import { HeroService } from './../../hero.service';
import { Hero } from './../../hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {
  heroes: Hero[];
  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.insertHero({ name } as Hero).subscribe()
      // .subscribe(hero => {
      //   this.heroes.push(hero);
      // });
  }
  // private genid() {
  //   let max = 0;
  //   for (let i=0; i<this.heroes.length; i++){
  //     max=(max>this.heroes['id'])?this.heroes['id']:max;
  //   }
  //   return max + 1
  // }
}
